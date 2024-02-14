import { getFirestore } from 'firebase-admin/firestore';

import { STMachine } from 'src/lib/types';

import { COLLECTION, DOCUMENT } from '../lib/constants';
import { MachineSetting } from '../lib/types';

export function consumeTurn(
  machine: { name: STMachine; data: MachineSetting },
  player: { address: string; turnCount: number }
) {
  const db = getFirestore();
  const machineRef = db.collection(COLLECTION.MACHINES_STATE).doc(machine.name);
  const turnCountRef = db.collection(COLLECTION.PLAY_TURN_COUNT).doc(DOCUMENT.SWAPPABLE_TRAITS);
  const batch = db.batch();

  batch.set(machineRef, machine.data);
  batch.update(turnCountRef, { [player.address]: player.turnCount });

  return batch.commit();
}
