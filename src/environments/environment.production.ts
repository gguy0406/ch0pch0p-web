import { NPMachine, STMachine } from '../lib/types';

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

export const EVENT_ATTENDANCE_ADDRESSES: readonly string[] = [
  'stars1054m3v0mdekpw4f6xpsqahyvuv59upvlut6vy8',
  'stars10kjuq40jmvn9rtcvnymmjs2rs3lc5c8utqwlkv',
  'stars10xqatnnrrqs45nldtxj4zdvn9rp5eaw0qttkck',
  'stars12c672m2m0wg4x6d9pmfhrd9cyxzg4ul3fyre7m',
  'stars12kct4cfuwh7vevec7c4y9slmee949qrjp5ds2x',
  'stars12snjq0654lde843tcmksguphc4h88y2nu48g5f',
  'stars135ye8rl8fdydvwr38fwwgrf8t7sccdcrc8gy83',
  'stars13kup3wy4eszpm306ycvc4j5y05xms9p7yh0f7t',
  'stars13ml8ncuzcecwq5mxpk2n3lef8pckr588va6kkw',
  'stars13n20ds4kt063pasy8nl5y23cf6qwks7tzvkm46',
  'stars13s5czcpgqem8gcya4qn74mj6yut4urudys6v5y',
  'stars13x3n4n6ajykrg6w4jhhcp77su8gusf2cn7zpzn',
  'stars14trvm9aqra67uykhquxrykffr8zrnmq53sknc4',
  'stars158aukkslmhn8e8dtdkmptwlhemq5qwe9rmz9vc',
  'stars15tn0mhwv4vvefwj7sfafp73njups2kaya8l9jf',
  'stars15ttxygzxlcyrs3zu8cx2g4364mckjs97v3cdev',
  'stars165s3zw3vaytnjvfv390f9f876u79zv494kne7y',
  'stars16xvqcqqy027ncsn9xwpytfjpvs57wnngh44q06',
  'stars18hj0dztsqyarjvfa30d64csj3ms06er3a8cjg3',
  'stars19h4fk4dpchn7fs9jd3qhqauwf3pqznc38avwwv',
  'stars19vqjj6a4wcsnd82v50y9payde726f5ke4tkk4k',
  'stars19yssr677uxtauv8hpfg4t4ystqx4dj9xsqvpfl',
  'stars1a0ayvt5cgxwscvt4caau4ygrck77ktz6k752vy',
  'stars1axw88ugkakle6g6ma7ev4f30lhzzyfaz3rus5u',
  'stars1c5qduhcwymj77zn4988kzuws6l36fsp04z2fuk',
  'stars1c8fymac2cszrary506nxykvkvnv5djv55pqwq2',
  'stars1casdzl6qnvty9e6krwca0ja779hfef22kmpr00',
  'stars1chlpr5rzmk99ctx082ekeh4zscvjjeca0pm0e5',
  'stars1d638gncyvhsx9zqg8y9hsaz8tge8vune5lvtsv',
  'stars1d74f6c7rgyyym57530rc2tt88fnl6wpdcpz6ta',
  'stars1d7mw9l7cjynmhzf0n9pflzs92qvfws3u78dwzm',
  'stars1dttwdapdrrdghqtcptpu25h4lkah0l3vnf7yrk',
  'stars1e9jgtm8de6ljyrazhmsupr9m85rdj8lm8apvhq',
  'stars1e9p8t2p8mwqwmqaagqa3vfpk2vthxjk3q99ch9',
  'stars1elneyfk0k46g3zt26gxmakk003zd7vlt365a3n',
  'stars1epw58tmxkcu7l0m4facs5pydsylpx3e6gq6q7f',
  'stars1f498arhha37yt72trg2d235n38ukhjhswwrq4m',
  'stars1fga5wkj0da28jl39x76p7whv7l766jzllsz8mk',
  'stars1fgqtgthfvwrh445ukcg5ja3mqvhsznv5tqxc93',
  'stars1fj64ewdg0pmj296vltjk75y4rrkzlypu4342me',
  'stars1fkg9kmfa60ckg2syvnz7vxgtkpetmqdnqnjtl0',
  'stars1fkvmqm4udhv6sp2euu8tz3y7jwrnl9l9adpydp',
  'stars1fqw4urjl4u75l04k8ndmj2f5n5g4skdssj5p4r',
  'stars1gcnlv5grp9lntjzkgcx88z04h9cqlldlkxn0ls',
  'stars1gxhrcw73vyc40adznrtp3nugfcxsg66luwts5y',
  'stars1h2nkraz7q8v96naqrkvykja99ysducz6x0hcw6',
  'stars1hdsmz2kqftgk2ypa5t62aauvl0y3c2nf7tqh76',
  'stars1hheryepdqyamzy4vsh7alcjlwq5k0kfmsusn9v',
  'stars1j2q6x22gep0ed8rqs3vpft6wfhuc3ql47yffs2',
  'stars1j63ay9ggkp9uz6kyzphu7a0cutvq585ptfgxd3',
  'stars1j6yw6aldlctpaz2na3awsnexle3a8k6z8x9744',
  'stars1j8xcf9yuyjlr9p5qpnwrplvxqjc3ya4fcvexds',
  'stars1jzt962czzt3ruwsapec9fzmrm7kcj442vjk36c',
  'stars1k5c9pg9l9v7jfjthlzf6zuxw2hs3yw44e2jgnl',
  'stars1kfkhtthgf5pwcqrws042ddtvzgdq6ssr3nkd0z',
  'stars1kn25v0w5sxnz6eqwwvvrvgvjtzgj7dvdrl6sw9',
  'stars1ks3p0rtxkph9us3rg5z3as2hl4gfq4fupnfz35',
  'stars1l5nyr5q6v3yw3a56rhjxxd86mcwunj5fmw2czz',
  'stars1m4e9cvkycmmwac6c5smacfgv5f6ywrpryq2vhh',
  'stars1me6xrxj80cp4smrmy2mwaan67spnsen9yn3kry',
  'stars1mqypstgwxah7mnw2dqh25g9f3qq55zg9g9650z',
  'stars1msyzn0fz7swk5jjsht4dugxckfhn25dtefkypj',
  'stars1nrjm6skxa2lgugv4c7w4ztacek3u2e0qehhtp5',
  'stars1nvhkffsctzdawh4fxu46j29a30g8vcs7rdfe5j',
  'stars1ppk3ascqs5zrt9qqg3y579lp005uvnkhm363ge',
  'stars1q9t5fa4zhv9pn52snhyga4y54fceyhrdu9z0qk',
  'stars1qkjcqvwclse06h5zvznhnp9ngvzz74z5pst5sr',
  'stars1qkplzlttfhawdmn5q8xerx04v0hhsfgnhmktfz',
  'stars1qttmfljc3qcerypthjtxw4a8675xcf9ht0a9tt',
  'stars1r7jrgtm3x5yau585dc5uhlq86vzrjua75zxqmz',
  'stars1rqfxea3s4hruf7n8atj26qzzzdxk2fuczv5f8n',
  'stars1s475d4waxa9gzhg72amdk64trlw5psddkpr84u',
  'stars1sa9l23aatpcc82tyt3hsk7ck4yf5u9ajerft36',
  'stars1sajfwhh6apwfp45c58v9ul2lw3rvhqqs87vtzn',
  'stars1sar8cu0rc96yqv3yth7gummg6dvx4pyr65ukd5',
  'stars1sdy2lhzh98xvv363da7xvg3jwlud9shceyumyj',
  'stars1secpmv4xu4c206kx0tw33a86qgls25haftgakv',
  'stars1tacz5j07mkpk0n476sf0jrlujeky9ggxw4r3ru',
  'stars1ty5r4p80cna0hvfml8xfx6sudew3w6z7gvdk7a',
  'stars1uzgnpf4lfkl28mdlkqrtvy990suwnklantvjw3',
  'stars1v3act9pnkjyzjtq25tjunqnz8xj0gpc2n6hjvz',
  'stars1v3yhlvgl54s00z2ll83jlftle73g7929nt6qt8',
  'stars1wkeu28y0al4k8vpa9rg7qpw5qf2yx9x48vkq3x',
  'stars1wpnxm0vmx6a6ddmhhdmzjc29s8xn7s2ucpl2we',
  'stars1wtcp7m7589vdmsse30rsrlt357dwy0qygc79uf',
  'stars1xk9dsqx5wz44c58e2m5qes2xdgvsc5xg63pdh3',
  'stars1xt2zcdhdf02jx5csak4t25lygfn4rwg7r2z2rz',
  'stars1xwmah02dcpgwx0g9ff6ql7sx4h7f4z8pzuzn5j',
  'stars1y7zfelflwnm9aaldd9xp5x4p8azn8vddj7eraz',
  'stars1y96fge9vjphl3zj39c5s4xq9avh233lq3re8wn',
  'stars1yjh55mu7j58s8z9p604ltjefg36nls29dugxud',
  'stars1ywqjtwhtn02zkph80cgwlg6kkmzl8wg7zf08rl',
  'stars1zl5cxgxj5hmp4zk2thyql8xcxw9w7gn3lfwfy9',
  'stars1zvd8c2wk0dup5rxctysa6p0y6ruu0c34np0s8p',
] as const;

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
  { contract: 'stars13zpzu64jlepas6w4c9yd5t62vsq3p9umzs2upvn9e762vrtmn3nseckeds', tokenId: '1290' },
  { contract: 'stars1mvnqhskpmwy8tjkuftwvnl56x5kumlgnqffaqpcscpnrnw3mep4s9z2s9m', tokenId: '1025' },
  { contract: 'stars17jlt0jgwe0a5t4h77cad5e7s3ch0hq2jtagusf90sz8pm2g73vks06z696', tokenId: '744' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '2238' },
  { contract: 'stars1cap78f8su4mjdtezr4e2lzynyrv4l6v7qck5d8cpwyrkjla4vuysqthgy3', tokenId: '516' },
  { contract: 'stars19u7tjuk66zx277q7j2edxr2agjnlxac4lwyrqrfaelgjhacvchhqwxlkul', tokenId: '198' },
  { contract: 'stars14n5q229hsdcfq4vsw9x4gphrkxf2sf55n382428sx3mp38k5agzqsyxpjt', tokenId: '198' },
  { contract: 'stars17jlt0jgwe0a5t4h77cad5e7s3ch0hq2jtagusf90sz8pm2g73vks06z696', tokenId: '296' },
  { contract: 'stars1llfhdx7cwtaa0txt3rgt8sgn748gqp8nnelvpud63le4e0rmwrgs6arqg9', tokenId: '10' },
  { contract: 'stars14dvtygyukyrh7r765nynvqnmyxjcwtvekj8dy5rj9aknp9mmk8qswgdwh7', tokenId: '9760' },
  { contract: 'stars1cap78f8su4mjdtezr4e2lzynyrv4l6v7qck5d8cpwyrkjla4vuysqthgy3', tokenId: '2524' },
  { contract: 'stars1gksnmakpcs64gzf09aaw9zsqg8599nme86xqchpl336dhtey6z4szmsueh', tokenId: '736' },
  { contract: 'stars1fgtq2mkw8p67lx0xgl9tqpttxqh076c8u6zk6l8r5d935z5pfersa6nx30', tokenId: '1950' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '2958' },
  { contract: 'stars1gksnmakpcs64gzf09aaw9zsqg8599nme86xqchpl336dhtey6z4szmsueh', tokenId: '57' },
  { contract: 'stars1qeqxp2f8tclhevlk5rsaeypmws6r7kwz68qklj78h2wedjvqm8jqgxjhpy', tokenId: '1010' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '200' },
  { contract: 'stars18d7ver7mmjdt06mz6x0pz09862060kupju75kpka5j0r7huearcsq0gyg0', tokenId: '448' },
  { contract: 'stars1cap78f8su4mjdtezr4e2lzynyrv4l6v7qck5d8cpwyrkjla4vuysqthgy3', tokenId: '2449' },
  { contract: 'stars13zpzu64jlepas6w4c9yd5t62vsq3p9umzs2upvn9e762vrtmn3nseckeds', tokenId: '63' },
  { contract: 'stars1eg20cvzk33wfn67kkujysda72rvxvy7a2wxhg857zk4stz25mn5s20qyfe', tokenId: '1203' },
  { contract: 'stars156x86uprzaj04v7qwnpl8djj5jws3gn73jz08qkydmkd0c0lp6gqv575pm', tokenId: '6691' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '407' },
  { contract: 'stars1cap78f8su4mjdtezr4e2lzynyrv4l6v7qck5d8cpwyrkjla4vuysqthgy3', tokenId: '3040' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '588' },
  { contract: 'stars19u7tjuk66zx277q7j2edxr2agjnlxac4lwyrqrfaelgjhacvchhqwxlkul', tokenId: '873' },
  { contract: 'stars1qeqxp2f8tclhevlk5rsaeypmws6r7kwz68qklj78h2wedjvqm8jqgxjhpy', tokenId: '3721' },
  { contract: 'stars156x86uprzaj04v7qwnpl8djj5jws3gn73jz08qkydmkd0c0lp6gqv575pm', tokenId: '6575' },
  { contract: 'stars1uxmx24dcfvg49tldd85tuejtldgw6ecng592y30yu3dh78szk88sqf9s5v', tokenId: '76' },
  { contract: 'stars120pue6syyajg6wtj0339qa42a279xaj8km889lgx2lvw325leevs2s79h2', tokenId: '345' },
  { contract: 'stars1mvnqhskpmwy8tjkuftwvnl56x5kumlgnqffaqpcscpnrnw3mep4s9z2s9m', tokenId: '1696' },
  { contract: 'stars120pue6syyajg6wtj0339qa42a279xaj8km889lgx2lvw325leevs2s79h2', tokenId: '346' },
  { contract: 'stars156x86uprzaj04v7qwnpl8djj5jws3gn73jz08qkydmkd0c0lp6gqv575pm', tokenId: '5594' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '1446' },
  { contract: 'stars19u7tjuk66zx277q7j2edxr2agjnlxac4lwyrqrfaelgjhacvchhqwxlkul', tokenId: '969' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '4955' },
  { contract: 'stars1v6qmv4vk0ws7anm7mnt0x4whazcgyjd5t75svtapm67xrx5urepspe48af', tokenId: '1043' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '1' },
  { contract: 'stars1v3cz86955slt9v0t5x0g8d2qx2a4ncwflj4uvk94z6wzaur08afqvqlfmu', tokenId: '1652' },
  { contract: 'stars13zpzu64jlepas6w4c9yd5t62vsq3p9umzs2upvn9e762vrtmn3nseckeds', tokenId: '1665' },
  { contract: 'stars1guclr6f9ycqvj7avqzfw4dvhagawlcju707t789uumt9hdw79jyqke2f2c', tokenId: '4719' },
  { contract: 'stars1v6qmv4vk0ws7anm7mnt0x4whazcgyjd5t75svtapm67xrx5urepspe48af', tokenId: '1194' },
  { contract: 'stars10h9mr3z3xycatlp8pjqw478g74mvuacghq9rn3selc7u4m9zxthqfafz0e', tokenId: '790' },
  { contract: 'stars120pue6syyajg6wtj0339qa42a279xaj8km889lgx2lvw325leevs2s79h2', tokenId: '348' },
  { contract: 'stars1uxmx24dcfvg49tldd85tuejtldgw6ecng592y30yu3dh78szk88sqf9s5v', tokenId: '683' },
  { contract: 'stars19u7tjuk66zx277q7j2edxr2agjnlxac4lwyrqrfaelgjhacvchhqwxlkul', tokenId: '818' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '168' },
  { contract: 'stars1gksnmakpcs64gzf09aaw9zsqg8599nme86xqchpl336dhtey6z4szmsueh', tokenId: '990' },
  { contract: 'stars13zpzu64jlepas6w4c9yd5t62vsq3p9umzs2upvn9e762vrtmn3nseckeds', tokenId: '2834' },
  { contract: 'stars120pue6syyajg6wtj0339qa42a279xaj8km889lgx2lvw325leevs2s79h2', tokenId: '347' },
  { contract: 'stars1gksnmakpcs64gzf09aaw9zsqg8599nme86xqchpl336dhtey6z4szmsueh', tokenId: '401' },
  { contract: 'stars1f5weff5rw08l7j9ggz2efctzv5hskydcr4qxwe9zklecl5u27zcq44p2rd', tokenId: '236' },
  { contract: 'stars1v6qmv4vk0ws7anm7mnt0x4whazcgyjd5t75svtapm67xrx5urepspe48af', tokenId: '1810' },
  { contract: 'stars1guclr6f9ycqvj7avqzfw4dvhagawlcju707t789uumt9hdw79jyqke2f2c', tokenId: '4387' },
  { contract: 'stars156x86uprzaj04v7qwnpl8djj5jws3gn73jz08qkydmkd0c0lp6gqv575pm', tokenId: '5361' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '4277' },
  { contract: 'stars13zpzu64jlepas6w4c9yd5t62vsq3p9umzs2upvn9e762vrtmn3nseckeds', tokenId: '2209' },
  { contract: 'stars156x86uprzaj04v7qwnpl8djj5jws3gn73jz08qkydmkd0c0lp6gqv575pm', tokenId: '6780' },
  { contract: 'stars1spkstth4kqxv9jzwhgt33kpkrl30p9hdrd4uvp7af7ph46ev0g5qpg04pf', tokenId: '1728' },
  { contract: 'stars18d7ver7mmjdt06mz6x0pz09862060kupju75kpka5j0r7huearcsq0gyg0', tokenId: '1993' },
  { contract: 'stars120pue6syyajg6wtj0339qa42a279xaj8km889lgx2lvw325leevs2s79h2', tokenId: '349' },
] as const;
