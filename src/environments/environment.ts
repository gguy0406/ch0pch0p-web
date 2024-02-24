import { STMachine } from 'lib/types';

export const CONTRACT_ADDRESS = {
  C0_SG721: 'stars10h9mr3z3xycatlp8pjqw478g74mvuacghq9rn3selc7u4m9zxthqfafz0e',
  C1_SG721: '',
  CERT_MINTER: '',
  CERT_SG721: '',
} as const;

export const MACHINE_CONFIG = {
  [STMachine.CH0PCH0P]: {
    TOKEN_ID_START_FROM: 1,
    START_TIME: new Date(1710633600000),
    CONTRACT_ADDRESSES_HOLDER_CHECK: [],
  },
  [STMachine.REKT_GANG]: {
    TOKEN_ID_START_FROM: 21,
    START_TIME: new Date(1709424000000),
    CONTRACT_ADDRESSES_HOLDER_CHECK: [
      'stars1ts5ymnra9wv27eqty8x88lhty4svea2j6jkw20t3mnnne6jwk5fqplsrdg',
      'stars19qvuad9m95prf4efuycrc5h7ldlefaqq4z69wlqzpcyjnwh3eanqyychet',
    ],
  },
} as const;

export const API_BASE_URL = 'https://ch0pch0p.com/api';
export const IS_PRODUCTION = true;
export const ST_MAXIMUM_TURN_PER_DAY = 2;
export const STARGAZE_CHAIN_ID = 'stargaze-1';
export const STARGAZE_GRAPHQL_ENDPOINT = 'https://graphql.mainnet.stargaze-apis.com/graphql';
export const STARGAZE_RPC_ENDPOINT = 'https://rpc.stargaze-apis.com';
