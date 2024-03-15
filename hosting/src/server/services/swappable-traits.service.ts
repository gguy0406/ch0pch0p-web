import { CosmWasmClient, MsgExecuteContractEncodeObject } from '@cosmjs/cosmwasm-stargate';
import { fromUtf8, toUtf8 } from '@cosmjs/encoding';
import { StargateClient } from '@cosmjs/stargate';
import { Image, createCanvas, loadImage } from 'canvas';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import { Tx } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import createHttpError, { UnknownError } from 'http-errors';
import { Blob, File, NFTStorage } from 'nft.storage';
import { readFile, readdir } from 'node:fs/promises';
import path, { dirname, join as pathJoin, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  CONTRACT_ADDRESS,
  MACHINE_CONFIG,
  MAXIMUM_GAME_TURN_PER_DAY,
  STARGAZE_RPC_ENDPOINT,
} from 'environments/environment';

import { consumeTurn } from '../db/consume-turn';
import * as dbMachines from '../db/machines';
import * as dbTurnCount from '../db/play-turn-count';
import { ST_GAME_FEE, WEB_RUNNER_ADDRESS } from '../lib/constants';
import { QueryCheckTokenHolderResult, getGraphqlQueryCheckTokenHolder, graphqlQuery } from '../lib/helpers';
import { MachineStatus, STMachine } from '../lib/types';
import { checkStarsAddress } from '../middlewares/check-stars-address';
import { logger } from '../utils/logger';
import { sendMessageToDiscord } from '../utils/msg-discord';
import { getSigningCosmWasmClient, runProbability } from './lucky-gacha.service';

export async function play(machine: STMachine, payFeeTx: Uint8Array) {
  const decodedTx = decodeTx(payFeeTx);
  const msgSend = decodeMsgSend(decodedTx.body!.messages[0].value);

  if (
    msgSend.toAddress !== WEB_RUNNER_ADDRESS ||
    msgSend.amount[0].denom !== 'ustars' ||
    Number(msgSend.amount[0].amount) < ST_GAME_FEE * 10 ** 6
  ) {
    throw createHttpError(402);
  }

  try {
    checkStarsAddress(msgSend.fromAddress);
  } catch {
    const txResult = await broadcastTx(payFeeTx);

    if (txResult.code === 0) logger.warn(`${msgSend.fromAddress} donate ${msgSend.amount[0].amount}stars`);
    else throw createHttpError(402);
    return;
  }

  const machineSetting = await dbMachines.get(machine);

  if (machineSetting.status !== MachineStatus.AVAILABLE) throw createHttpError(400, 'Machine is not available');

  const playerTurnCount = await dbTurnCount.get(msgSend.fromAddress);

  if (playerTurnCount >= MAXIMUM_GAME_TURN_PER_DAY) throw createHttpError(400, `${msgSend.fromAddress} out of turn`);

  const isEligible =
    (await checkTokenHolder(msgSend.fromAddress, [CONTRACT_ADDRESS.C0_SG721, CONTRACT_ADDRESS.C1_SG721])) ||
    (await checkTokenHolder(msgSend.fromAddress, MACHINE_CONFIG[machine].CONTRACT_ADDRESSES_HOLDER_CHECK));

  if (!isEligible) throw createHttpError(403, `${msgSend.fromAddress} is not eligible`);

  const payFeeTxResult = await broadcastTx(payFeeTx);

  if (payFeeTxResult.code !== 0) throw createHttpError(402);

  const winThePrize = runProbability(machineSetting);

  if (!winThePrize) {
    await consumeTurn({ name: machine, data: machineSetting }, msgSend.fromAddress);
    return;
  }

  const client = await getSigningCosmWasmClient();
  const tokenId = String(MACHINE_CONFIG[machine].TOKEN_ID_START_FROM + machineSetting.wonPrize);
  const mintMsg: MsgExecuteContractEncodeObject = {
    typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: MsgExecuteContract.fromPartial({
      sender: WEB_RUNNER_ADDRESS,
      contract: CONTRACT_ADDRESS.CERT_MINTER,
      msg: toUtf8(JSON.stringify({ mint_for: { recipient: msgSend.fromAddress, token_id: tokenId } })),
    }),
  };
  const txResult = await client.signAndBroadcast(WEB_RUNNER_ADDRESS, [mintMsg], 'auto', 'win lucky gacha');

  if (txResult.code !== 0) {
    const errMsg =
      `Cert mint failed.\n` +
      `Address: ${msgSend.fromAddress}.\n` +
      `Token ID: ${tokenId}.\n` +
      `Tx hash: ${txResult.transactionHash}`;
    sendMessageToDiscord(errMsg);
    throw createHttpError(500, errMsg);
  }

  await consumeTurn({ name: machine, data: machineSetting }, msgSend.fromAddress, true);

  sendMessageToDiscord(
    `Cert minted No. ${machineSetting.wonPrize + 1}\n` +
      `Address: ${msgSend.fromAddress}.\n` +
      `Token ID: ${tokenId}.\n` +
      `Tx hash: ${txResult.transactionHash}`
  );

  return { contract: CONTRACT_ADDRESS.CERT_MINTER, tokenId: tokenId, txHash: txResult.transactionHash };
}

export async function updateTokenMetadata(tokenId: string, transferTx: Uint8Array) {
  const decodedTx = decodeTx(transferTx);

  if (decodedTx.body!.messages[0].typeUrl !== '/cosmwasm.wasm.v1.MsgExecuteContract') throw createHttpError(400);

  const decodedMsgExecuteContract = decodeMsgExecuteContract(decodedTx.body!.messages[0].value);
  const transferMsg = JSON.parse(fromUtf8(decodedMsgExecuteContract.msg));

  if (
    decodedMsgExecuteContract.contract !== CONTRACT_ADDRESS.CERT_MINTER ||
    !transferMsg?.transfer_nft?.token_id ||
    transferMsg.transfer_nft.recipient !== WEB_RUNNER_ADDRESS
  ) {
    throw createHttpError(400);
  }

  const tokenOwner = await getOwnerOf(tokenId);

  if (tokenOwner !== decodedMsgExecuteContract.sender) throw createHttpError(403);

  const c1TokenMetadata = await getTokenMetadata(CONTRACT_ADDRESS.C1_SG721, tokenId);
  const certTokenMetadata = await getTokenMetadata(CONTRACT_ADDRESS.CERT_SG721, tokenId);

  if (c1TokenMetadata.rawAttributes[certTokenMetadata.attributes[0].trait_type] === 'Empty') {
    throw createHttpError(400, `Cannot update token ${tokenId}`);
  }

  const transferTxResult = await broadcastTx(transferTx);

  if (transferTxResult.code !== 0) throw createHttpError(400);

  const image = await generateNewImage(c1TokenMetadata.rawAttributes, certTokenMetadata.rawAttributes);
  const cid = await uploadImageToStorage(image, `${tokenId}.jpeg`);
  const client = await getSigningCosmWasmClient();
  const updateMsg: MsgExecuteContractEncodeObject = {
    typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: MsgExecuteContract.fromPartial({
      sender: WEB_RUNNER_ADDRESS,
      contract: CONTRACT_ADDRESS.CERT_MINTER,
      msg: toUtf8(JSON.stringify({ update_token_metadata: { token_id: tokenId, token_uri: cid } })),
    }),
  };
  const txResult = await client.signAndBroadcast(WEB_RUNNER_ADDRESS, [updateMsg], 'auto', 'level up');

  if (txResult.code !== 0) {
    throw createHttpError(
      500,
      `Update metadata failed.\nToken Id: ${tokenId}.\nCID: ${cid}.\nTx hash: ${txResult.transactionHash}`
    );
  }
}

function decodeTx(tx: Uint8Array) {
  try {
    return Tx.decode(tx);
  } catch (err) {
    throw createHttpError(400, (err as UnknownError).toString());
  }
}

function decodeMsgSend(encodedMsg: Uint8Array) {
  try {
    return MsgSend.decode(encodedMsg);
  } catch (err) {
    throw createHttpError(400, (err as UnknownError).toString());
  }
}

export async function checkTokenHolder(ownerAddress: string, collectionAddresses: readonly string[]) {
  const queryParam = getGraphqlQueryCheckTokenHolder(ownerAddress, collectionAddresses);
  const queryResult = await graphqlQuery<QueryCheckTokenHolderResult>(queryParam.query, queryParam.variables);

  return !!queryResult.tokens.pageInfo.total;
}

function decodeMsgExecuteContract(encodedMsg: Uint8Array) {
  try {
    return MsgExecuteContract.decode(encodedMsg);
  } catch (err) {
    throw createHttpError(400, (err as UnknownError).toString());
  }
}

async function broadcastTx(tx: Uint8Array) {
  const stargateClient = await StargateClient.connect(STARGAZE_RPC_ENDPOINT);

  try {
    return await stargateClient.broadcastTx(tx);
  } catch (err) {
    throw createHttpError(400, (err as UnknownError).toString());
  }
}

async function getOwnerOf(tokenId: string) {
  const cosmWasmClient = await CosmWasmClient.connect(STARGAZE_RPC_ENDPOINT);

  try {
    return (await cosmWasmClient.queryContractSmart(CONTRACT_ADDRESS.C1_SG721, { owner_of: { token_id: tokenId } }))
      .owner;
  } catch (err) {
    throw createHttpError(400, (err as UnknownError).toString());
  }
}

async function getTokenMetadata(
  sg721Address: string,
  tokenId: string
): Promise<{
  name: string;
  image: string;
  rawAttributes: Record<string, string>;
  attributes: Array<{ value: string; trait_type: string; display_type: string }>;
}> {
  const tokenUri = await getTokenUri(sg721Address, tokenId);

  if (!tokenUri) throw createHttpError(400);

  const tokenMetadataResponse = await fetch(tokenUri.replace('ipfs://', 'https://nftstorage.link/ipfs/'));

  if (!tokenMetadataResponse.ok) {
    throw createHttpError(
      500,
      `Failed to fetch token ${tokenId} metadata`,
      `Sg721 address: ${sg721Address}`,
      tokenMetadataResponse.statusText
    );
  }

  const tokenMetadata = await tokenMetadataResponse.json();

  if (!tokenMetadata?.attributes) {
    throw createHttpError(500, `Something wrong with metadata ${CONTRACT_ADDRESS.C1_SG721} - ${tokenId}`);
  }

  return tokenMetadata;
}

async function getTokenUri(sg721Address: string, tokenId: string) {
  const cosmWasmClient = await CosmWasmClient.connect(STARGAZE_RPC_ENDPOINT);

  try {
    return (await cosmWasmClient.queryContractSmart(sg721Address, { nft_info: { token_id: tokenId } })).token_uri;
  } catch (err) {
    throw createHttpError(400, (err as UnknownError).toString());
  }
}

async function generateNewImage(tokenMetadata: Record<string, string>, traitMetadata: Record<string, string>) {
  const traits = ['Background', 'Body', 'Clothes', 'Self', 'Hand', 'Head', 'Hair', 'Face', 'Ear', 'Nose'];
  const syncColorSetting = {
    syncColorTraits: ['Body', 'Hand', 'Head', 'Ear', 'Nose'],
    defaultSet: { 'Main color': '#A97400', 'Shadow color': '#703500' },
    colorSets: {
      Tan: { 'Main color': '#A97400', 'Shadow color': '#703500' },
      Light: { 'Main color': '#FFC68E', 'Shadow color': '#FF9A4F' },
      Cocoa: { 'Main color': '#AA4A37', 'Shadow color': '#741B11' },
      Fair: { 'Main color': '#FFECF1', 'Shadow color': '#F2C9D6' },
      'Lean Addicted': { 'Main color': '#7C00D9', 'Shadow color': '#3C00B9' },
      Zombie: { 'Main color': '#B8FFEC', 'Shadow color': '#2ED8A7' },
    },
  };

  type ColorType = keyof (typeof syncColorSetting)['defaultSet'];
  type Skin = keyof (typeof syncColorSetting)['colorSets'];

  const currentDir = dirname(fileURLToPath(import.meta.url));
  const traitsPath = resolve(currentDir, '..', 'assets');
  const layerRegex = /\.\d+$/;
  const layers: Record<string, Image> = {};

  traits.forEach(async (trait, index) => {
    const element = Object.keys(traitMetadata).includes(trait) ? traitMetadata[trait] : tokenMetadata[trait];
    const regex = new RegExp(`/^${element}(.d+)?.(png|svg)$/`);
    const traitPath = path.join(traitsPath, trait);

    (await readdir(traitPath))
      .filter((fileName) => regex.test(fileName))
      .forEach(async (fileName) => {
        const filePath = pathJoin(traitPath, fileName);
        const layerName = path.basename(fileName, path.extname(fileName));
        const layerZIndex = Number(layerName.match(layerRegex)?.[0].substring(1)) || index * 100;

        if (
          path.extname(filePath) === '.svg' &&
          syncColorSetting.syncColorTraits.includes(trait) &&
          syncColorSetting.colorSets[tokenMetadata['Skin'] as Skin]
        ) {
          let imgFile = await readFile(filePath, { encoding: 'utf-8' });
          const img = new Image();

          Object.keys(syncColorSetting.defaultSet).forEach((type) => {
            imgFile = imgFile.replace(
              syncColorSetting.defaultSet[type as ColorType],
              syncColorSetting.colorSets[tokenMetadata['Skin'] as Skin][type as ColorType]
            );
          });

          img.src = 'data:image/svg+xml;charset=utf-8,' + imgFile;
          layers[layerZIndex] = img;
          return;
        }

        layers[layerZIndex] = await loadImage(filePath);
      });
  });

  const canvas = createCanvas(2000, 2000);
  const ctx = canvas.getContext('2d');

  for (const layer of Object.values(layers)) {
    ctx.drawImage(layer, 0, 0);
  }

  return canvas.toBuffer('image/jpeg', { quality: 1 });
}

function uploadImageToStorage(image: Buffer, fileName: string) {
  const client = new NFTStorage({ token: process.env['STORAGE_API_KEY'] as string });
  const blob = new Blob([image]);
  const file = new File([blob], fileName);

  return client.storeDirectory([file]);
}
