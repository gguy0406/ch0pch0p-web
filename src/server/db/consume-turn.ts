import { FieldValue, Firestore, Timestamp, getFirestore } from 'firebase-admin/firestore';

import { FIRESTORE_DATABASE } from 'environments/environment';

import { COLLECTION } from '../lib/constants';
import { MachineSetting, MachineStatus, NPMachine, STMachine } from '../lib/types';

let db: Firestore;

setImmediate(() => (db = getFirestore(FIRESTORE_DATABASE)));

export async function consumeTurn(
  machine: { name: STMachine | NPMachine; data: MachineSetting },
  playerAddress: string,
  winThePrize?: boolean
) {
  const machineRef = db.collection(COLLECTION.MACHINES).doc(machine.name);
  const turnCountRef = db.collection(COLLECTION.PLAY_TURN_COUNT).doc(playerAddress);
  const batch = db.batch();
  const maxStage = Math.max(...Object.keys(machine.data.remainedTurn).map((key) => Number(key)));
  const machineUpdateData = {
    totalTurn: FieldValue.increment(1),
    [`remainedTurn.${machine.data.stage}`]: FieldValue.increment(-1),
    ...(winThePrize
      ? {
          wonPrize: FieldValue.increment(1),
          [`prizeAllocation.${machine.data.stage}`]: FieldValue.increment(-1),
          ...(machine.data.prizeAllocation[machine.data.stage] === 1 && machine.data.stage === maxStage
            ? { status: MachineStatus.MINT_OUT }
            : {}),
        }
      : {}),
    ...(machine.data.remainedTurn[machine.data.stage] === 1 && machine.data.stage < maxStage
      ? {
          stage: FieldValue.increment(1),
          stageStartDate: Timestamp.now(),
        }
      : {}),
  };

  batch.update(machineRef, machineUpdateData);
  batch.set(turnCountRef, { count: FieldValue.increment(1) });

  return batch.commit();
}
