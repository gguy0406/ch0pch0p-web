import { MachineStatus, NPMachine, STMachine } from './types';

export type Machine = { id: STMachine | NPMachine; status: MachineStatus; wonPrize: number };
export type GachaPrize = { contract: string; tokenId: string; txHash: string } | undefined;
