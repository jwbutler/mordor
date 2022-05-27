import type { Coordinates } from './geometry';
import type { Tile } from './tiles';

type Level = {
  tiles: Tile[][],
  startingPoint: Coordinates
};

export type { Level };
