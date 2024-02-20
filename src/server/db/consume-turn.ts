import { FieldValue, Firestore, getFirestore } from 'firebase-admin/firestore';

import { COLLECTION, DOCUMENT } from '../lib/constants';
import { MachineSetting, STMachine } from '../lib/types';

let db: Firestore;

setImmediate(() => (db = getFirestore()));

export function consumeTurn(
  machine: { name: STMachine; stage: MachineSetting['stage'] },
  playerAddress: string,
  winThePrize?: boolean
) {
  const machineRef = db.collection(COLLECTION.MACHINES_STATE).doc(machine.name);
  const turnCountRef = db.collection(COLLECTION.PLAY_TURN_COUNT).doc(DOCUMENT.SWAPPABLE_TRAITS);
  const batch = db.batch();

  batch.update(machineRef, {
    totalTurn: FieldValue.increment(1),
    [`remainedTurn.${machine.stage}`]: FieldValue.increment(-1),
    ...(winThePrize ? { [`prizeAllocation.${machine.stage}`]: FieldValue.increment(-1) } : {}),
  });
  batch.update(turnCountRef, { [playerAddress]: FieldValue.increment(1) });

  return batch.commit();
}
