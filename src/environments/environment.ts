import { NPMachine, STMachine } from '../lib/types';

export const API_BASE_URL = 'http://localhost:4000/api';
export const FIRESTORE_DATABASE = 'test';
export const IS_PRODUCTION = false;
export const MAXIMUM_GAME_TURN_PER_DAY = 60;
export const STARGAZE_CHAIN_ID = 'elgafar-1';
export const STARGAZE_GRAPHQL_ENDPOINT = 'https://graphql.testnet.stargaze-apis.com/graphql';
export const STARGAZE_RPC_ENDPOINT = 'https://rpc.elgafar-1.stargaze-apis.com';

export const EVENT_ATTENDANCE_ADDRESSES: readonly string[] = [
  'stars1vka2ttgakm65av7kqt9ecwh3eeswz9avca853q',
  'stars1dttwdapdrrdghqtcptpu25h4lkah0l3vnf7yrk',
] as const;

export const CONTRACT_ADDRESS = {
  C0_SG721: 'stars1e88vzwpe42j2ev07lacy49uxsp7ndv00l9suuhdcm58c0cau4sasn09l3t',
  C1_SG721: 'stars1z58uwr7v5x6hdmp366n6h7p58j3fw5vf8wu43f459s4lrwvj3ryshnt8hh',
  CERT_MINTER: 'stars179pl8c2s4zkx97j99c4xv2vvfm4sgk7gmghszggnwlz4p2scvsns2n3q2t',
  CERT_SG721: 'stars1hlm4atmh6zvkxarjva054qqwc5k55s4fkfujgyngnyu37qw72ynsldnj0e',
} as const;

export const MACHINE_CONFIG = {
  [STMachine.CH0PCH0P]: {
    TOKEN_ID_START_FROM: 1,
    START_TIME: new Date(),
    CONTRACT_ADDRESSES_HOLDER_CHECK: [],
  },
  [NPMachine.CNC]: {
    START_TIME: new Date(),
  },
} as const;

export const NFT_POOL: readonly { readonly contract: string; readonly tokenId: string }[] = [
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '4543' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '4999' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '4766' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '4683' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '3957' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '1281' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '3362' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '913' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '16' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '5067' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '5089' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '3456' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '577' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '424' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '2410' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '2874' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '4932' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '1474' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '3027' },
  { contract: 'stars1sal77qa26ph0g4ysja3f5mwv485qyed92kas9yx07krse89ar5ysxah8yl', tokenId: '326' },
] as const;
