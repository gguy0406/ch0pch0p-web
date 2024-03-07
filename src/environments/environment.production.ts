import { NPMachine, STMachine } from '@lib/types';

export const API_BASE_URL = 'https://ch0pch0p.com/api';
export const FIRESTORE_DATABASE = '(default)';
export const IS_PRODUCTION = true;
export const MAXIMUM_GAME_TURN_PER_DAY = 2;
export const STARGAZE_CHAIN_ID = 'stargaze-1';
export const STARGAZE_GRAPHQL_ENDPOINT = 'https://graphql.mainnet.stargaze-apis.com/graphql';
export const STARGAZE_RPC_ENDPOINT = 'https://rpc.stargaze-apis.com';

export const CONTRACT_ADDRESS = {
  C0_SG721: 'stars10h9mr3z3xycatlp8pjqw478g74mvuacghq9rn3selc7u4m9zxthqfafz0e',
  C1_SG721: 'stars1j947vk0takflmf4j6wjsy3gr58ua5n7g55af2v8zskmvfxqejzhqw66ys6',
  CERT_MINTER: '',
  CERT_SG721: '',
} as const;

export const EVENT_ATTENDANCE_ADDRESSES: readonly string[] = [] as const;

export const MACHINE_CONFIG = {
  [STMachine.CH0PCH0P]: {
    TOKEN_ID_START_FROM: 1,
    START_TIME: new Date(1709424000000),
    CONTRACT_ADDRESSES_HOLDER_CHECK: [],
  },
  [NPMachine.CNC]: {
    START_TIME: new Date(1709856000000),
  },
} as const;

export const NFT_POOL: readonly { readonly contract: string; readonly tokenId: string }[] = [
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '1' },
  { contract: 'stars1llfhdx7cwtaa0txt3rgt8sgn748gqp8nnelvpud63le4e0rmwrgs6arqg9', tokenId: '10' },
  { contract: 'stars1gksnmakpcs64gzf09aaw9zsqg8599nme86xqchpl336dhtey6z4szmsueh', tokenId: '57' },
  { contract: 'stars13zpzu64jlepas6w4c9yd5t62vsq3p9umzs2upvn9e762vrtmn3nseckeds', tokenId: '63' },
  { contract: 'stars1uxmx24dcfvg49tldd85tuejtldgw6ecng592y30yu3dh78szk88sqf9s5v', tokenId: '76' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '168' },
  { contract: 'stars19u7tjuk66zx277q7j2edxr2agjnlxac4lwyrqrfaelgjhacvchhqwxlkul', tokenId: '198' },
  { contract: 'stars14n5q229hsdcfq4vsw9x4gphrkxf2sf55n382428sx3mp38k5agzqsyxpjt', tokenId: '198' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '200' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '236' },
  { contract: 'stars17jlt0jgwe0a5t4h77cad5e7s3ch0hq2jtagusf90sz8pm2g73vks06z696', tokenId: '296' },
  { contract: 'stars1gksnmakpcs64gzf09aaw9zsqg8599nme86xqchpl336dhtey6z4szmsueh', tokenId: '401' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '407' },
  { contract: 'stars18d7ver7mmjdt06mz6x0pz09862060kupju75kpka5j0r7huearcsq0gyg0', tokenId: '448' },
  { contract: 'stars1cap78f8su4mjdtezr4e2lzynyrv4l6v7qck5d8cpwyrkjla4vuysqthgy3', tokenId: '516' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '588' },
  { contract: 'stars1uxmx24dcfvg49tldd85tuejtldgw6ecng592y30yu3dh78szk88sqf9s5v', tokenId: '683' },
  { contract: 'stars1gksnmakpcs64gzf09aaw9zsqg8599nme86xqchpl336dhtey6z4szmsueh', tokenId: '736' },
  { contract: 'stars17jlt0jgwe0a5t4h77cad5e7s3ch0hq2jtagusf90sz8pm2g73vks06z696', tokenId: '744' },
  { contract: 'stars10h9mr3z3xycatlp8pjqw478g74mvuacghq9rn3selc7u4m9zxthqfafz0e', tokenId: '790' },
  { contract: 'stars19u7tjuk66zx277q7j2edxr2agjnlxac4lwyrqrfaelgjhacvchhqwxlkul', tokenId: '818' },
  { contract: 'stars19u7tjuk66zx277q7j2edxr2agjnlxac4lwyrqrfaelgjhacvchhqwxlkul', tokenId: '873' },
  { contract: 'stars19u7tjuk66zx277q7j2edxr2agjnlxac4lwyrqrfaelgjhacvchhqwxlkul', tokenId: '969' },
  { contract: 'stars1gksnmakpcs64gzf09aaw9zsqg8599nme86xqchpl336dhtey6z4szmsueh', tokenId: '990' },
  { contract: 'stars1qeqxp2f8tclhevlk5rsaeypmws6r7kwz68qklj78h2wedjvqm8jqgxjhpy', tokenId: '1010' },
  { contract: 'stars1mvnqhskpmwy8tjkuftwvnl56x5kumlgnqffaqpcscpnrnw3mep4s9z2s9m', tokenId: '1025' },
  { contract: 'stars1v6qmv4vk0ws7anm7mnt0x4whazcgyjd5t75svtapm67xrx5urepspe48af', tokenId: '1043' },
  { contract: 'stars1v6qmv4vk0ws7anm7mnt0x4whazcgyjd5t75svtapm67xrx5urepspe48af', tokenId: '1194' },
  { contract: 'stars1eg20cvzk33wfn67kkujysda72rvxvy7a2wxhg857zk4stz25mn5s20qyfe', tokenId: '1203' },
  { contract: 'stars13zpzu64jlepas6w4c9yd5t62vsq3p9umzs2upvn9e762vrtmn3nseckeds', tokenId: '1290' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '1446' },
  { contract: 'stars1v3cz86955slt9v0t5x0g8d2qx2a4ncwflj4uvk94z6wzaur08afqvqlfmu', tokenId: '1652' },
  { contract: 'stars13zpzu64jlepas6w4c9yd5t62vsq3p9umzs2upvn9e762vrtmn3nseckeds', tokenId: '1665' },
  { contract: 'stars1mvnqhskpmwy8tjkuftwvnl56x5kumlgnqffaqpcscpnrnw3mep4s9z2s9m', tokenId: '1696' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '1728' },
  { contract: 'stars1v6qmv4vk0ws7anm7mnt0x4whazcgyjd5t75svtapm67xrx5urepspe48af', tokenId: '1810' },
  { contract: 'stars1fgtq2mkw8p67lx0xgl9tqpttxqh076c8u6zk6l8r5d935z5pfersa6nx30', tokenId: '1950' },
  { contract: 'stars18d7ver7mmjdt06mz6x0pz09862060kupju75kpka5j0r7huearcsq0gyg0', tokenId: '1993' },
  { contract: 'stars13zpzu64jlepas6w4c9yd5t62vsq3p9umzs2upvn9e762vrtmn3nseckeds', tokenId: '2209' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '2238' },
  { contract: 'stars1cap78f8su4mjdtezr4e2lzynyrv4l6v7qck5d8cpwyrkjla4vuysqthgy3', tokenId: '2449' },
  { contract: 'stars1cap78f8su4mjdtezr4e2lzynyrv4l6v7qck5d8cpwyrkjla4vuysqthgy3', tokenId: '2524' },
  { contract: 'stars13zpzu64jlepas6w4c9yd5t62vsq3p9umzs2upvn9e762vrtmn3nseckeds', tokenId: '2834' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '2958' },
  { contract: 'stars1cap78f8su4mjdtezr4e2lzynyrv4l6v7qck5d8cpwyrkjla4vuysqthgy3', tokenId: '3040' },
  { contract: 'stars1qeqxp2f8tclhevlk5rsaeypmws6r7kwz68qklj78h2wedjvqm8jqgxjhpy', tokenId: '3721' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '4277' },
  { contract: 'stars1guclr6f9ycqvj7avqzfw4dvhagawlcju707t789uumt9hdw79jyqke2f2c', tokenId: '4387' },
  { contract: 'stars1guclr6f9ycqvj7avqzfw4dvhagawlcju707t789uumt9hdw79jyqke2f2c', tokenId: '4719' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '4955' },
  { contract: 'stars14dvtygyukyrh7r765nynvqnmyxjcwtvekj8dy5rj9aknp9mmk8qswgdwh7', tokenId: '9760' },
] as const;
