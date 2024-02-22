import dotenv from 'dotenv';
import { cert, initializeApp } from 'firebase-admin/app';
import { Timestamp, getFirestore } from 'firebase-admin/firestore';

import { MachineStatus, STMachine } from 'lib/types';
import { COLLECTION } from 'server/lib/constants';
import { MachineSetting } from 'server/lib/types';

const machine = STMachine[process.argv[2] as keyof typeof STMachine];
const startDate = process.argv[3];
let errMsg: string;

if (!process.argv[2]) errMsg = 'Must provide machine name';
if (!machine) errMsg = 'Invalid machine name';
if (!startDate) errMsg = 'Must provide start date';
if (errMsg!) {
  console.error(errMsg);
  process.exit();
}

dotenv.config();

const serviceAccount = JSON.parse(process.env['CHOP_SERVICE_ACCOUNT'] as string);
const setting: MachineSetting = {
  status: MachineStatus.COMING_SOON,
  totalTurn: 0,
  stage: 1,
  stageStartDate: Timestamp.fromMillis(Number(startDate)),
  stageDuration: {
    1: 86400000,
    2: 86400000,
    3: 86400000,
    4: 86400000 * 28,
  },
  remainedTurn: {
    1: 300,
    2: 200,
    3: 200,
    4: 400,
  },
  prizeAllocation: {
    1: 4,
    2: 3,
    3: 3,
    4: 10,
  },
};

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/gm, '\n');

initializeApp({ credential: cert(serviceAccount) });

(async () => {
  const db = getFirestore();
  const docRef = db.collection(COLLECTION.MACHINES_STATE).doc(machine);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    console.error('Doc exist');
    return;
  }

  await getFirestore().collection(COLLECTION.MACHINES_STATE).doc(machine).set(setting);
})();
