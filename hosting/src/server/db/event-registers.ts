import { CollectionReference, Firestore, Timestamp, getFirestore } from 'firebase-admin/firestore';

import { FIRESTORE_DATABASE } from 'environments/environment';

import { COLLECTION } from '../lib/constants';
import { EventRegister } from '../lib/types';

let db: Firestore;

setImmediate(() => initDbConnection());

function initDbConnection() {
  db = getFirestore(FIRESTORE_DATABASE);
}

export function saveRegisterForm(eventRegister: EventRegister) {
  if (!db) initDbConnection();

  const today = new Date();
  const eventRegistersCollectionRef: CollectionReference = db.collection(
    `${COLLECTION.EVENT_REGISTERS}-${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}`
  );

  return eventRegistersCollectionRef.doc().create({ ...eventRegister, time: Timestamp.now() });
}
