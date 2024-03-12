import { CollectionReference, Firestore, getFirestore } from 'firebase-admin/firestore';

import { FIRESTORE_DATABASE } from 'environments/environment';

import { COLLECTION } from '../lib/constants';
import { MachineSetting, NPMachine, STMachine } from '../lib/types';

let db: Firestore;
let machineStateCollectionRef: CollectionReference;

setImmediate(() => initCollectionRef());

function initCollectionRef() {
  db = getFirestore(FIRESTORE_DATABASE);
  machineStateCollectionRef = db.collection(COLLECTION.MACHINES);
}

export async function getAll() {
  if (!machineStateCollectionRef) initCollectionRef();

  const snapshot = await machineStateCollectionRef.get();

  if (snapshot.empty) throw new Error('Cannot retrieve machine state');

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as { id: STMachine | NPMachine } & MachineSetting);
}

export async function get(machine: STMachine | NPMachine): Promise<MachineSetting> {
  if (!machineStateCollectionRef) initCollectionRef();

  const docRef = machineStateCollectionRef.doc(machine);
  const docSnap = await docRef.get();

  if (!docSnap.exists) throw new Error('Cannot retrieve machine state');

  return docSnap.data()! as MachineSetting;
}
