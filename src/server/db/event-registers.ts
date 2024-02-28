import { CollectionReference, Firestore, getFirestore } from 'firebase-admin/firestore';

import { COLLECTION } from '../lib/constants';
import { EventRegister } from '../lib/types';

let db: Firestore;
let eventRegistersCollectionRef: CollectionReference;

setImmediate(() => {
  db = getFirestore();
  eventRegistersCollectionRef = db.collection(COLLECTION.EVENT_REGISTERS);
});

export function saveRegisterForm(eventRegister: EventRegister) {
  return eventRegistersCollectionRef.doc().create(eventRegister);
}
