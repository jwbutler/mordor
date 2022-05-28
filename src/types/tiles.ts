import type { MapObject } from './objects';
import type { Unit } from './units';

type TileType = 'floor' | 'wall' | 'door_horizontal' | 'door_vertical';

type Tile = {
  type: TileType,
  enemies: Unit[],
  objects: MapObject[]
};

export type { Tile };
