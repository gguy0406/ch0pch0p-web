export enum STMachine {
  CH0PCH0P = 'ch0pch0p',
}

export enum NPMachine {
  CNC = 'cosmos-nft-conference',
}

export enum MachineStatus {
  COMING_SOON,
  AVAILABLE,
  MINT_OUT,
}

export enum Ticket {
  CH0PPERS,
  STANDARD,
  DONOR,
}

interface _EventRegister {
  email: string;
  name?: string;
  communityGang?: string;
}

export type EventRegister =
  | (_EventRegister & { ticket: Ticket.CH0PPERS; walletAddress: string })
  | { ticket: Omit<Ticket, 'CHOPPERS'>; transactionHash: string; walletAddress?: string };
