import { CONTRACT_ADDRESS } from 'environments/environment';

import { getMarketplaceUrl } from './helpers';

export * from 'lib/constants';

export const ROUTE = {
  C0: '"0"-by-ch0pch0p',
  C1: 'ch0pch0p',
  LEADERBOARD: 'hall-of-fame',
  STAKING: 'stake-with-us',
  GAME: 'ch0p-it',
  LUCKY_GACHA: 'lucky-gacha',
  LEVEL_UP: 'level-up',
  EVENT: 'event',
} as const;

export const BUY_CH0PCH0P_URL = getMarketplaceUrl(CONTRACT_ADDRESS.C0_SG721);
export const DISCORD_URL = 'https://discord.com/invite/tH3bnHEFGY';
export const X_URL = 'https://twitter.com/ch0pch0pNFT';
export const KEPLR_URL = 'https://www.keplr.app/download';
