import { CollectionReference, Firestore, getFirestore } from 'firebase-admin/firestore';

import { ST_MAXIMUM_TURN_PER_DAY } from 'environments/environment';

import { COLLECTION } from '../lib/constants';

let db: Firestore;
let collectionRef: CollectionReference;

setImmediate(() => {
  db = getFirestore();
  collectionRef = db.collection(COLLECTION.NP_TURN_COUNT);
});

export async function get(address: string): Promise<number> {
  const docSnap = await collectionRef.doc(address).get();

  return (docSnap.exists ? docSnap.data()?.[address] : null) ?? ST_MAXIMUM_TURN_PER_DAY;
}
