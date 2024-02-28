import { DocumentReference, Firestore, getFirestore } from 'firebase-admin/firestore';

import { ST_MAXIMUM_TURN_PER_DAY } from 'environments/environment';

import { COLLECTION, DOCUMENT } from '../lib/constants';

let db: Firestore;
let docRef: DocumentReference;

setImmediate(() => {
  db = getFirestore();
  docRef = db.collection(COLLECTION.PLAY_TURN_COUNT).doc(DOCUMENT.SWAPPABLE_TRAITS);
});

export async function get(address: string): Promise<number> {
  const docSnap = await docRef.get();

  return (docSnap.exists ? docSnap.data()?.[address] : null) ?? ST_MAXIMUM_TURN_PER_DAY;
}
