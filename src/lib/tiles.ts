import type { CompassDirection } from './geometry';
import type { MapObject } from './objects';
import type { Unit } from './units';

type TileType = 'floor' | 'wall' | 'door_horizontal' | 'door_vertical';

type Tile = {
  type: TileType,
  enemies: Unit[],
  objects: MapObject[]
};

const isWall = (tile: Tile | null) => tile?.type === 'wall';
const isDoor = (tile: Tile | null) => ['door_horizontal', 'door_vertical'].includes(tile?.type || 'nope');

const isWallLike = (tile: Tile | null, direction: CompassDirection) => {
  if (tile?.type === 'wall') {
    return true;
  }
  
  return (isDoor(tile) && !isDoorFacingDirection(tile, direction)); 
};

const isDoorFacingDirection = (tile: Tile | null, direction: CompassDirection): boolean => {
  switch (direction) {
    case 'north':
    case 'south':
      return tile?.type === 'door_vertical';
    case 'east':
    case 'west':
      return tile?.type === 'door_horizontal';
  }
};

export type { Tile };

export {
  isDoor,
  isDoorFacingDirection,
  isWall,
  isWallLike
};
