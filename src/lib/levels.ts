import { move, rotateLeft, rotateRight } from './geometry';
import type { CompassDirection, Coordinates } from './geometry';
import type { Tile } from './tiles';

type Level = {
  tiles: Tile[][],
  startingPoint: Coordinates
};

const getTile = (level: Level, { x, y }: Coordinates): Tile | null => level.tiles[y]?.[x] || null;

type TileViewColumn = 'left' | 'center' | 'right';

const getTilesInView = (
  level: Level,
  coordinates: Coordinates,
  direction: CompassDirection,
  maxDepth: number
): Record<TileViewColumn, (Tile | null)[]> => {
  const tiles: Record<TileViewColumn, (Tile | null)[]> = {
    'left': [],
    'center': [],
    'right': []
  };
  
  const center = coordinates;
  const left = move(coordinates, rotateLeft(direction));
  const right = move(coordinates, rotateRight(direction));
  
  for (let i = 0; i <= maxDepth; i++) {
    tiles['left'].push(getTile(level, move(left, direction, i)));
    tiles['center'].push(getTile(level, move(center, direction, i)));
    tiles['right'].push(getTile(level, move(right, direction, i)));
  }
  
  return tiles;
};

export type { Level };

export {
  getTile,
  getTilesInView
};
