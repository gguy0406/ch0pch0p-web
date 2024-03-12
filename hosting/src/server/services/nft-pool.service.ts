import { MsgExecuteContractEncodeObject } from '@cosmjs/cosmwasm-stargate';
import { toUtf8 } from '@cosmjs/encoding';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import createHttpError from 'http-errors';

import { EVENT_ATTENDANCE_ADDRESSES, MAXIMUM_GAME_TURN_PER_DAY, NFT_POOL } from 'environments/environment';

import { consumeTurn } from '../db/consume-turn';
import * as dbMachines from '../db/machines';
import * as dbTurnCount from '../db/play-turn-count';
import { WEB_RUNNER_ADDRESS } from '../lib/constants';
import { MachineStatus, NPMachine } from '../lib/types';
import { sendMessageToDiscord } from '../utils/msg-discord';
import { getSigningCosmWasmClient, runProbability } from './lucky-gacha.service';

export async function play(address: string) {
  const isEligible = EVENT_ATTENDANCE_ADDRESSES.includes(address);

  if (!isEligible) throw createHttpError(403, `${address} is not eligible`);

  const machineSetting = await dbMachines.get(NPMachine.CNC);

  if (machineSetting.status !== MachineStatus.AVAILABLE) throw createHttpError(400, 'Machine is not available');

  const playerTurnCount = await dbTurnCount.get(address);

  if (playerTurnCount >= MAXIMUM_GAME_TURN_PER_DAY) throw createHttpError(400, `${address} out of turn`);

  const winThePrize = runProbability(machineSetting);

  if (!winThePrize) {
    await consumeTurn({ name: NPMachine.CNC, data: machineSetting }, address);
    return;
  }

  const client = await getSigningCosmWasmClient();
  const nft = NFT_POOL[machineSetting.wonPrize];
  const transferMsg: MsgExecuteContractEncodeObject = {
    typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: MsgExecuteContract.fromPartial({
      sender: WEB_RUNNER_ADDRESS,
      contract: nft.contract,
      msg: toUtf8(JSON.stringify({ transfer_nft: { recipient: address, token_id: nft.tokenId } })),
    }),
  };
  const txResult = await client.signAndBroadcast(WEB_RUNNER_ADDRESS, [transferMsg], 'auto', 'win lucky gacha');

  if (txResult.code !== 0) {
    const errMsg =
      `Transfer NFT failed\n` +
      `Address: ${address}\n` +
      `Prize: ${nft.contract} - ${nft.tokenId}\n` +
      `Tx hash: ${txResult.transactionHash}`;
    sendMessageToDiscord(errMsg);
    throw createHttpError(500, errMsg);
  }

  await consumeTurn({ name: NPMachine.CNC, data: machineSetting }, address, true);

  sendMessageToDiscord(
    `Prize won No. ${machineSetting.wonPrize + 1}\n` +
      `Address: ${address}\n` +
      `Prize: ${nft.contract} - ${nft.tokenId}\n` +
      `Tx hash: ${txResult.transactionHash}`
  );

  return { contract: nft.contract, tokenId: nft.tokenId, txHash: txResult.transactionHash };
}
