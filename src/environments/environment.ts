import { STMachine } from 'lib/types';

export const API_BASE_URL = 'http://localhost:4000/api';
export const FIRESTORE_DATABASE = 'test';
export const IS_PRODUCTION = false;
export const MAXIMUM_GAME_TURN_PER_DAY = 20;
export const STARGAZE_CHAIN_ID = 'elgafar-1';
export const STARGAZE_GRAPHQL_ENDPOINT = 'https://graphql.testnet.stargaze-apis.com/graphql';
export const STARGAZE_RPC_ENDPOINT = 'https://rpc.elgafar-1.stargaze-apis.com';

export const CONTRACT_ADDRESS = {
  C0_SG721: 'stars1e88vzwpe42j2ev07lacy49uxsp7ndv00l9suuhdcm58c0cau4sasn09l3t',
  C1_SG721: 'stars1z58uwr7v5x6hdmp366n6h7p58j3fw5vf8wu43f459s4lrwvj3ryshnt8hh',
  CERT_MINTER: 'stars1mztsh0a8m6sjmw6dt9dmst3xj80f9uc246lgcveypeu3tn60yphqzdquxq',
  CERT_SG721: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl',
} as const;

export const MACHINE_CONFIG = {
  [STMachine.CH0PCH0P]: {
    TOKEN_ID_START_FROM: 1,
    START_TIME: new Date(),
    CONTRACT_ADDRESSES_HOLDER_CHECK: [],
  },
} as const;
