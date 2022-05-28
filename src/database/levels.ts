import type { Level } from '../types/levels';
import type { Tile } from '../types/tiles';
import { createKobold } from './units';

// +-----+
// |     |
// +-+-+ |
// |     |
// +D----+
// |     |
// +-----+

const floor = (): Tile => ({ type: 'floor', enemies: [], objects: [] });
const wall = (): Tile => ({ type: 'wall', enemies: [], objects: [] });
const horizontalDoor = (): Tile => ({ type: 'door_horizontal', enemies: [], objects: [] });
const verticalDoor = (): Tile => ({ type: 'door_vertical', enemies: [], objects: [] });

const createFirstLevel = (): Level => {
  return {
    tiles: [
      [wall(), wall(), wall(), wall(), wall(), wall(), wall()],
      [
        wall(),
        floor(),
        floor(),
        floor(),
        floor(),
        floor(),
        wall(),
      ],
      [wall(), wall(), wall(), wall(), wall(), floor(), wall()],
      [
        wall(),
        { type: 'floor', enemies: [createKobold()], objects: [] },
        floor(),
        floor(),
        floor(),
        floor(),
        wall(),
      ],
      [wall(), verticalDoor(), wall(), wall(), wall(), wall(), wall()],
      [wall(), floor(), floor(), floor(), floor(), floor(), wall()],
      [wall(), wall(), wall(), wall(), wall(), wall(), wall()],
    ],
    startingPoint: { x: 1, y: 1 }
  };
};

export { createFirstLevel };
