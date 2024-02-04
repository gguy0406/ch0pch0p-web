import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import { Tx } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import createHttpError, { UnknownError } from 'http-errors';

import { GAME_FEE, RECEIVER_ADDRESS } from 'src/lib/constants';
import { Machine } from 'src/lib/types';

import { GAME } from '../lib/constants';

const game = {
  'rekt-gang': {
    stage: 1,
    totalTurn: 0,
    maximumTurn: {
      1: 300,
      2: 200,
      3: 200,
      4: 400,
    },
    maximumDay: {
      1: 1,
      2: 1,
      3: 1,
      4: Infinity,
    },
    prizeAllocation: {
      1: 4,
      2: 3,
      3: 3,
      4: 10,
    },
  },
  'pixel-wizard': {
    stage: 1,
    totalTurn: 0,
    maximumTurn: {
      1: 300,
      2: 200,
      3: 200,
      4: 400,
    },
    maximumDay: {
      1: 1,
      2: 1,
      3: 1,
      4: Infinity,
    },
    prizeAllocation: {
      1: 4,
      2: 3,
      3: 3,
      4: 10,
    },
  },
};

export async function getTurnCount(address: string) {
  const countFromDb = {}[address];

  return countFromDb ?? GAME.SWAPPABLE_TRAIT.MAXIMUM_TURN_PER_DAY;
}

export async function play(machineId: Machine, payFeeTx: Uint8Array) {
  // check if game is still available
  const decodedTx = decodeTx(payFeeTx);
  const msgSend = decodeMsgSend(decodedTx.body!.messages[0].value);

  if (
    msgSend.toAddress !== RECEIVER_ADDRESS ||
    msgSend.amount[0].denom !== 'ustars' ||
    Number(msgSend.amount[0].amount) < GAME_FEE * 10 ** 6
  ) {
    throw createHttpError(402);
  }

  const winThePrize = runProbability(machineId);

  console.log(winThePrize);
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

function runProbability(machineId: Machine) {
  const machine = game[machineId];
  const random =
    Math.random() * machine.maximumTurn[machine.stage as 1 | 2 | 3 | 4] +
    (machine.maximumTurn[machine.stage as 1 | 2 | 3 | 4] - machine.prizeAllocation[machine.stage as 1 | 2 | 3 | 4]) /
      50;

  return random < machine.prizeAllocation[machine.stage as 1 | 2 | 3 | 4];
}

function testRunProbability() {
  const machine = game[Machine.REKT_GANG];
  let turn = 0;
  console.log(`stage ${machine.stage}`);

  while (machine.prizeAllocation[machine.stage as 1 | 2 | 3 | 4] > 0) {
    turn++;

    const winThePrize = runProbability(Machine.REKT_GANG);

    machine.maximumTurn[machine.stage as 1 | 2 | 3 | 4]--;

    if (winThePrize) {
      console.log(`${turn} / ${game[Machine.PIXEL_WIZARD].maximumTurn[machine.stage as 1 | 2 | 3 | 4]}`);

      machine.prizeAllocation[machine.stage as 1 | 2 | 3 | 4]--;

      if (machine.prizeAllocation[machine.stage as 1 | 2 | 3 | 4] === 0) {
        machine.stage++;
        turn = 0;
        console.log(`\nstage ${machine.stage}`);
      }
    }
  }
}

testRunProbability();
