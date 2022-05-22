import type { Coordinates, Direction } from './geometry';
import type { Unit } from './units';

type Player = {
  unit: Unit,
  coordinates: Coordinates,
  direction: Direction
};

export type { Player };
