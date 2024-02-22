import { STMachine } from './types';

export const CONTRACT_ADDRESS = {
  C0_SG721: 'stars10h9mr3z3xycatlp8pjqw478g74mvuacghq9rn3selc7u4m9zxthqfafz0e',
  C1_SG721: 'stars1qqw8udsgwz7ssddks0h22fgz326fh9cta0peg8wdlcf5a2vjhdjsjh0qdr',
  CERT_MINTER: 'stars179pl8c2s4zkx97j99c4xv2vvfm4sgk7gmghszggnwlz4p2scvsns2n3q2t',
  CERT_SG721: 'stars1hlm4atmh6zvkxarjva054qqwc5k55s4fkfujgyngnyu37qw72ynsldnj0e',
} as const;

export const MACHINE_COLLABORATOR_COLLECTION_ADDRESSES: { [k in STMachine]: readonly string[] } = {
  ch0pch0p: [],
  'rekt-gang': [],
} as const;

export const STARGAZE_GRAPHQL_ENDPOINT = 'https://graphql.mainnet.stargaze-apis.com/graphql';
export const WEB_RUNNER_ADDRESS = 'stars1vka2ttgakm65av7kqt9ecwh3eeswz9avca853q';
export const GAME_FEE = 10;
