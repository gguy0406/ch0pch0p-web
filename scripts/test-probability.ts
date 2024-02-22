import dotenv from 'dotenv';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { STMachine } from 'lib/types';
import { COLLECTION } from 'server/lib/constants';
import { MachineSetting } from 'server/lib/types';

const machine = STMachine[process.argv[2] as keyof typeof STMachine];
let errMsg: string;

if (!machine) errMsg = 'Must provide machine name';
if (errMsg!) {
  console.error(errMsg);
  process.exit();
}

dotenv.config();

const serviceAccount = JSON.parse(process.env['CHOP_SERVICE_ACCOUNT'] as string);

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/gm, '\n');

initializeApp({ credential: cert(serviceAccount) });

(async () => {
  const db = getFirestore();
  const docRef = db.collection(COLLECTION.MACHINES_STATE).doc(machine);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    console.error('Doc not exist');
    return;
  }

  const machineState: MachineSetting = docSnap.data() as MachineSetting;
  const maxStage = Math.max(...Object.keys(machineState.remainedTurn).map((value) => Number(value)));
  let turn = 0;
  let totalTurnInStage = machineState.remainedTurn[machineState.stage];

  console.log(`stage ${machineState.stage}`);

  while (machineState.prizeAllocation[machineState.stage] > 0) {
    turn++;

    const winThePrize = test(machineState);

    machineState.remainedTurn[machineState.stage]--;

    if (winThePrize) {
      console.log(`${turn} / ${totalTurnInStage}`);

      machineState.prizeAllocation[machineState.stage]--;

      if (machineState.prizeAllocation[machineState.stage] === 0 && machineState.stage !== maxStage) {
        machineState.stage++;
        turn = 0;
        totalTurnInStage = machineState.remainedTurn[machineState.stage as MachineSetting['stage']];
        console.log(`\nstage ${machineState.stage}`);
      }
    }
  }
})();

function test(machineState: MachineSetting) {
  const remainedTurn = machineState.remainedTurn[machineState.stage];
  const prizeAllocation = machineState.prizeAllocation[machineState.stage];
  const random = Math.random() * (remainedTurn + (remainedTurn - prizeAllocation) / 20);

  return random < prizeAllocation;
}
