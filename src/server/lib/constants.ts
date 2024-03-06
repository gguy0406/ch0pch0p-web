export * from 'lib/constants';

export const COLLECTION = {
  EVENT_REGISTERS: 'event-registers',
  MACHINES: 'machines',
  PLAY_TURN_COUNT: 'play-turn-count',
} as const;

export const NFT_POOL: readonly { readonly contract: string; readonly tokenId: string }[] = [] as const;
