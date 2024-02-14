import { MachineStatus } from 'src/lib/types';
import { MachineSetting } from './types';

export const COLLECTION = {
  MACHINES_STATE: 'machines-state',
  PLAY_TURN_COUNT: 'play-turn-count',
};

export const DOCUMENT = {
  SWAPPABLE_TRAITS: 'swappable-traits',
};

export const ST_MAXIMUM_TURN_PER_DAY = 2;

export const DEFAULT_MACHINE_SETTING: Omit<MachineSetting, 'collectionAddresses' | 'stageEndDate'> = {
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
};

export const RPC_ENDPOINT =
  process.env['NODE_ENV'] === 'production'
    ? 'https://rpc.stargaze-apis.com/'
    : 'https://rpc.elgafar-1.stargaze-apis.com';
