export const DIRECTION = {
  BACK: 'back',
  FORWARD: 'forward',
} as const;

export type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];
