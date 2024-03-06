import { Timestamp } from 'firebase-admin/firestore';

import { MachineStatus } from 'lib/types';

export * from 'lib/types';

export type Stage = 1 | 2 | 3 | 4;

export interface MachineSetting {
  status: MachineStatus;
  wonPrize: number;
  totalTurn: number;
  stage: Stage;
  stageStartDate: Timestamp;
  stageDuration: { [k in Stage]: number };
  remainedTurn: { [k in Stage]: number };
  prizeAllocation: { [k in Stage]: number };
}

export interface TurnCount {
  count: number;
}
