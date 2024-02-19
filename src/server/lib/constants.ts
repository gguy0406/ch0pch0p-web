import { STMachine, MachineStatus } from 'src/lib/types';

import { MachineSetting } from './types';

export const COLLECTION = {
  MACHINES_STATE: 'machines-state',
  PLAY_TURN_COUNT: 'play-turn-count',
} as const;

export const DOCUMENT = {
  SWAPPABLE_TRAITS: 'swappable-traits',
} as const;

export const MACHINE_COLLABORATOR_COLLECTION_ADDRESSES: { [k in STMachine]: readonly string[] } = {
  'rekt-gang': [],
  'pixel-wizard': [],
} as const;

export const DEFAULT_MACHINE_SETTING: Omit<MachineSetting, 'stageEndDate'> = {
  status: MachineStatus.COMING_SOON,
  totalTurn: 0,
  stage: 1,
  remainedTurn: {
    1: 300,
    2: 200,
    3: 200,
    4: 400,
  },
  maximumDay: {
    1: 1,
    2: 1,
    3: 1,
    4: Infinity,
  },
  prizeAllocation: {
    1: 4,
    2: 3,
    3: 3,
    4: 10,
  },
} as const;

export const ST_MAXIMUM_TURN_PER_DAY = 2;
export const RPC_ENDPOINT =
  process.env['NODE_ENV'] === 'production'
    ? 'https://rpc.stargaze-apis.com/'
    : 'https://rpc.elgafar-1.stargaze-apis.com';
