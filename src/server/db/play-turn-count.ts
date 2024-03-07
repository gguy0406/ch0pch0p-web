import { CollectionReference, Firestore, getFirestore } from 'firebase-admin/firestore';

import { FIRESTORE_DATABASE } from 'environments/environment';

import { COLLECTION } from '../lib/constants';
import { TurnCount } from '../lib/types';

let db: Firestore;
let collectionRef: CollectionReference;

setImmediate(() => {
  db = getFirestore(FIRESTORE_DATABASE);
  collectionRef = db.collection(COLLECTION.PLAY_TURN_COUNT);
});

export async function get(address: string): Promise<number> {
  const docSnap = await collectionRef.doc(address).get();

  return (docSnap.exists ? (docSnap.data() as TurnCount)?.count : null) ?? 0;
}
