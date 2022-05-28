import type { CompassDirection } from '../types/geometry';
import type { Tile } from '../types/tiles';

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

export {
  isDoorFacingDirection,
  isWall,
  isWallLike
};
