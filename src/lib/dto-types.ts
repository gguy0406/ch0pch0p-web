import { MachineStatus, NPMachine, STMachine } from './types';

export type Machine = { id: STMachine | NPMachine; status: MachineStatus };
