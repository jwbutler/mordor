import type { Coordinates, CompassDirection } from './geometry';
import type { Unit } from './units';
import type { Location } from './location';

type Player = {
  unit: Unit,
  location: Location,
  coordinates: Coordinates,
  direction: CompassDirection,
  gold: number
};

export type { Player };
