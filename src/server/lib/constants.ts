export * from 'lib/constants';

export const COLLECTION = {
  EVENT_REGISTERS: 'event-registers',
  MACHINES_STATE: 'machines-state',
  PLAY_TURN_COUNT: 'play-turn-count',
} as const;

export const DOCUMENT = {
  SWAPPABLE_TRAITS: 'swappable-traits',
} as const;
