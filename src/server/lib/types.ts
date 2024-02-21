export * from 'src/lib/types';

import { Timestamp } from 'firebase-admin/firestore';

import { MachineStatus } from 'src/lib/types';

type Stage = 1 | 2 | 3 | 4;

export interface MachineSetting {
  status: MachineStatus;
  totalTurn: number;
  stage: Stage;
  stageStartDate: Timestamp;
  stageDuration: { [k in Stage]: number };
  remainedTurn: { [k in Stage]: number };
  prizeAllocation: { [k in Stage]: number };
}
