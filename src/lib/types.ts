export enum STMachine {
  CH0PCH0P = 'ch0pch0p',
  REKT_GANG = 'rekt-gang',
}

export enum MachineStatus {
  COMING_SOON,
  AVAILABLE,
  MINT_OUT,
}

export interface EventRegister {
  email: string;
  ticket: Ticket;
  transactionHash: string;
  name?: string;
  communityGang?: string;
  walletAddress?: string;
}

export enum Ticket {
  CH0PPERS,
  STANDARD,
  DONOR,
}

export enum Payment {
  NOBLE,
  OSMOSIS,
}
