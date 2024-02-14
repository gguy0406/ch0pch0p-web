import { MsgExecuteContractEncodeObject, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { toUtf8 } from '@cosmjs/encoding';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice, StargateClient } from '@cosmjs/stargate';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import { Tx } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import createHttpError, { UnknownError } from 'http-errors';

import { CONTRACT_ADDRESS, GAME_FEE, WEB_RUNNER_ADDRESS } from 'src/lib/constants';
import { STMachine, MachineStatus } from 'src/lib/types';

import { consumeTurn } from '../db/consume-turn';
import { getAll, get as getMachine } from '../db/machines';
import { get as dbGetTurnCount } from '../db/st-turn-count';
import { RPC_ENDPOINT, ST_MAXIMUM_TURN_PER_DAY } from '../lib/constants';
import { MachineSetting } from '../lib/types';
import { logger } from '../utils/logger';
import { checkTokenHolder } from '../utils/check-token-owner';
import webRunnerMnemonic from '../web-runner.json';

export function getTurnCount(address: string) {
  return dbGetTurnCount(address);
}

export async function getMachines() {
  const machines = await getAll();

  return machines.map((machine) => ({ id: machine.id, status: machine.status }));
}

export async function play(machine: STMachine, payFeeTx: Uint8Array) {
  const decodedTx = decodeTx(payFeeTx);
  const msgSend = decodeMsgSend(decodedTx.body!.messages[0].value);

  if (
    msgSend.toAddress !== WEB_RUNNER_ADDRESS ||
    msgSend.amount[0].denom !== 'ustars' ||
    Number(msgSend.amount[0].amount) < GAME_FEE * 10 ** 6
  ) {
    throw createHttpError(402);
  }

  let stargateClient: StargateClient;

  if (msgSend.fromAddress.length !== 44 || !msgSend.fromAddress.startsWith('stars')) {
    stargateClient = await StargateClient.connect(RPC_ENDPOINT);

    await stargateClient.broadcastTx(payFeeTx);

    logger.warn(`${msgSend.fromAddress} donate ${msgSend.amount[0].amount} STARS`);
    return;
  }

  const machineSetting = await getMachine(machine);

  if (machineSetting.status !== MachineStatus.AVAILABLE) throw createHttpError(400, 'Machine is not available');

  const playerTurnCount = await dbGetTurnCount(msgSend.fromAddress);

  if (playerTurnCount >= ST_MAXIMUM_TURN_PER_DAY) throw createHttpError(400, `${msgSend.fromAddress} out of turn`);

  if (process.env['NODE_ENV'] === 'production') {
    const isEligible =
      (await checkTokenHolder(msgSend.fromAddress, [CONTRACT_ADDRESS.c0])) ||
      (await checkTokenHolder(msgSend.fromAddress, machineSetting.collectionAddresses));

    if (!isEligible) throw createHttpError(403, `${msgSend.fromAddress} is not eligible`);
  }

  const winThePrize = runProbability(machineSetting);
  const updateMachineData = {
    ...machineSetting,
    totalTurn: machineSetting.totalTurn + 1,
    remainedTurn: {
      ...machineSetting.remainedTurn,
      [machineSetting.stage]: machineSetting.remainedTurn[machineSetting.stage] - 1,
    },
  };

  if (!winThePrize) {
    await consumeTurn(
      { name: machine, data: updateMachineData },
      { address: msgSend.fromAddress, turnCount: playerTurnCount + 1 }
    );
    return;
  }

  await consumeTurn(
    {
      name: machine,
      data: {
        ...updateMachineData,
        prizeAllocation: {
          ...machineSetting.prizeAllocation,
          [machineSetting.stage]: machineSetting.prizeAllocation[machineSetting.stage] - 1,
        },
      },
    },
    { address: msgSend.fromAddress, turnCount: playerTurnCount + 1 }
  );

  const client = await SigningCosmWasmClient.connectWithSigner(
    RPC_ENDPOINT,
    await DirectSecp256k1HdWallet.fromMnemonic(webRunnerMnemonic.mnemonic, { prefix: 'stars' }),
    { gasPrice: GasPrice.fromString('1ustars') }
  );

  const executeContractMsg: MsgExecuteContractEncodeObject = {
    typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: MsgExecuteContract.fromPartial({
      sender: WEB_RUNNER_ADDRESS,
      contract: 'stars1vsqp2hqg78fuwtgse3t3p728q5pzzmnn5r58v036m2gtwujx6grs68usnp',
      msg: toUtf8(JSON.stringify({ transfer_nft: { token_id: token_id, recipient: msgSend.fromAddress } })),
    }),
  };
}

export function updateTokenMetadata(tokenId: number, sendTraitTx: Uint8Array) {
  console.log(tokenId, sendTraitTx);
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

function runProbability(machineSetting: MachineSetting) {
  const remainedTurn = machineSetting.remainedTurn[machineSetting.stage];
  const prizeAllocation = machineSetting.prizeAllocation[machineSetting.stage];
  const random = Math.random() * (remainedTurn + (remainedTurn - prizeAllocation) / 20);

  return random < prizeAllocation;
}
