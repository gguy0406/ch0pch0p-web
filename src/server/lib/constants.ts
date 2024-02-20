export * from 'src/lib/constants';

export const COLLECTION = {
  MACHINES_STATE: 'machines-state',
  PLAY_TURN_COUNT: 'play-turn-count',
} as const;

export const DOCUMENT = {
  SWAPPABLE_TRAITS: 'swappable-traits',
} as const;

export const ST_MAXIMUM_TURN_PER_DAY = 2;
export const RPC_ENDPOINT =
  process.env['NODE_ENV'] === 'production'
    ? 'https://rpc.stargaze-apis.com/'
    : 'https://rpc.elgafar-1.stargaze-apis.com';
