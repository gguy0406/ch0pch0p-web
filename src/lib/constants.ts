import { getMarketplaceUrl } from './functions';

export const ROUTE = {
  C0: '"0"-by-ch0pch0p',
  C1: 'c1',
  LEADERBOARD: 'hall-of-fame',
  STAKING: 'stake-with-us',
  GAME: 'ch0p-it',
} as const;

export const CONTRACT_ADDRESS = {
  c0: 'stars10h9mr3z3xycatlp8pjqw478g74mvuacghq9rn3selc7u4m9zxthqfafz0e',
} as const;

export const BUY_CH0PCH0P_URL = getMarketplaceUrl(CONTRACT_ADDRESS.c0);
