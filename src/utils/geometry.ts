import type { Coordinates, Direction } from '../types/geometry';

const rotateRight = (direction: Direction): Direction => ({
  'north': 'east',
  'east': 'south',
  'south': 'west',
  'west': 'north'
}[direction] as Direction);

const rotateLeft = (direction: Direction): Direction => ({
  'north': 'west',
  'east': 'north',
  'south': 'east',
  'west': 'south'
}[direction] as Direction);

const rotate180 = (direction: Direction): Direction => ({
  'north': 'south',
  'east': 'west',
  'south': 'north',
  'west': 'east'
}[direction] as Direction);

const move = ({ x, y }: Coordinates, direction: Direction): Coordinates => {
  switch (direction) {
    case 'north': return { x, y: y - 1 };
    case 'south': return { x, y: y + 1 };
    case 'east':  return { x: x + 1, y };
    case 'west':  return { x: x - 1, y };
  }
};

export {
  move,
  rotate180,
  rotateLeft,
  rotateRight
};
