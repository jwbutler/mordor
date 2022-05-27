import type { Coordinates, CompassDirection } from './geometry';
import type { Unit } from './units';

type Player = {
  unit: Unit,
  coordinates: Coordinates,
  direction: CompassDirection
};

export type { Player };
