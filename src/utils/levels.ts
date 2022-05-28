import type { Coordinates } from '../types/geometry';
import type { Level } from '../types/levels';
import type { Tile } from '../types/tiles';

const getTile = (level: Level, { x, y }: Coordinates): Tile | null => level.tiles[y]?.[x] || null;

export {
  getTile
};
