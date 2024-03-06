export const WEB_RUNNER_ADDRESS = 'stars1vka2ttgakm65av7kqt9ecwh3eeswz9avca853q';
export const ST_GAME_FEE = 10;
export const NP_GAME_FEE = 0;

export const API_ROUTE = {
  EVENT_REGISTERS: '/event-registers',
  LUCKY_GACHA: '/lucky-gacha',
  NFT_POOL: '/nft-pool',
  SWAPPABLE_TRAITS: '/swappable-traits',
} as const;

export const LUCKY_GACHA_ROUTE = {
  MACHINES: '/machines',
  TURN_COUNT: '/turn-count',
} as const;

export const NFT_POOL_ROUTE = {
  PLAY: '/play',
} as const;

export const SWAPPABLE_TRAITS_ROUTE = {
  PLAY: '/play',
  LEVEL_UP: '/level-up',
} as const;

export const EVENT_ATTENDANCE_ADDRESSES: readonly string[] = [] as const;
