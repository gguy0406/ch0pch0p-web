import { STMachine } from 'lib/types';

export const CONTRACT_ADDRESS = {
  C0_SG721: 'stars10h9mr3z3xycatlp8pjqw478g74mvuacghq9rn3selc7u4m9zxthqfafz0e',
  C1_SG721: 'stars1j947vk0takflmf4j6wjsy3gr58ua5n7g55af2v8zskmvfxqejzhqw66ys6',
  CERT_MINTER: '',
  CERT_SG721: '',
} as const;

export const MACHINE_CONFIG = {
  [STMachine.CH0PCH0P]: {
    TOKEN_ID_START_FROM: 1,
    START_TIME: new Date(1709424000000),
    CONTRACT_ADDRESSES_HOLDER_CHECK: [],
  },
} as const;

export const API_BASE_URL = 'https://ch0pch0p.com/api';
export const IS_PRODUCTION = true;
export const ST_MAXIMUM_TURN_PER_DAY = 2;
export const NP_MAXIMUM_TURN_PER_DAY = 2;
export const STARGAZE_CHAIN_ID = 'stargaze-1';
export const STARGAZE_GRAPHQL_ENDPOINT = 'https://graphql.mainnet.stargaze-apis.com/graphql';
export const STARGAZE_RPC_ENDPOINT = 'https://rpc.stargaze-apis.com';
