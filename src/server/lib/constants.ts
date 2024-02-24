export * from 'lib/constants';

export const COLLECTION = {
  MACHINES_STATE: 'machines-state',
  PLAY_TURN_COUNT: 'play-turn-count',
} as const;

export const DOCUMENT = {
  SWAPPABLE_TRAITS: 'swappable-traits',
} as const;

export const ST_MAXIMUM_TURN_PER_DAY = 2;
