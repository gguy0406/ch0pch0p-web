import { Firestore, getFirestore } from 'firebase-admin/firestore';

import { COLLECTION } from '../lib/constants';
import { MachineSetting, STMachine } from '../lib/types';

let db: Firestore;
let machineStateCollectionRef: ReturnType<Firestore['collection']>;

setImmediate(() => {
  db = getFirestore();
  machineStateCollectionRef = db.collection(COLLECTION.MACHINES_STATE);
});

export async function getAll() {
  const snapshot = await machineStateCollectionRef.get();

  if (snapshot.empty) throw new Error('Cannot retrieve machine state');

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as { id: string } & MachineSetting);
}

export async function get(machine: STMachine): Promise<MachineSetting> {
  const docRef = machineStateCollectionRef.doc(machine);
  const docSnap = await docRef.get();

  if (!docSnap.exists) throw new Error('Cannot retrieve machine state');

  return docSnap.data()! as MachineSetting;
}
