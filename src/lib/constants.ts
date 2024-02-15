import { getMarketplaceUrl } from './helpers';

export const ROUTE = {
  C0: '"0"-by-ch0pch0p',
  C1: 'c1',
  LEADERBOARD: 'hall-of-fame',
  STAKING: 'stake-with-us',
  GAME: 'ch0p-it',
} as const;

export const CONTRACT_ADDRESS = {
  C0_SG721: 'stars10h9mr3z3xycatlp8pjqw478g74mvuacghq9rn3selc7u4m9zxthqfafz0e',
  C1_SG721: 'stars1e88vzwpe42j2ev07lacy49uxsp7ndv00l9suuhdcm58c0cau4sasn09l3t',
  CERT_MINTER: 'stars14recq0c5tvpn6qh4de9jq527mfchszyq7yve5h0segnca4tv7gpqznzkk8',
  CERT_SG721: 'stars1v28ehjd680q072tl2ddsq25zd3uc6f8nyy4u3mq6ryjzgfh9qg2slu3vcr',
} as const;

export const BUY_CH0PCH0P_URL = getMarketplaceUrl(CONTRACT_ADDRESS.C0_SG721);
export const STARGAZE_GRAPHQL_ENDPOINT = 'https://graphql.mainnet.stargaze-apis.com/graphql';
export const WEB_RUNNER_ADDRESS = 'stars1vka2ttgakm65av7kqt9ecwh3eeswz9avca853q';
export const GAME_FEE = 10;
