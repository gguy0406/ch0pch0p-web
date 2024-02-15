import { MachineStatus } from 'src/lib/types';

type Stage = 1 | 2 | 3 | 4;

export interface MachineSetting {
  status: MachineStatus;
  totalTurn: number;
  stage: Stage;
  stageEndDate: Date;
  remainedTurn: { [k in Stage]: number };
  maximumDay: { [k in Stage]: number };
  prizeAllocation: { [k in Stage]: number };
}
