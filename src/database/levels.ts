import type { Level } from '../types/levels';
import { TileBuilder } from '../types/tiles';
import { createKobold } from './units';

// +-----+
// |     |
// +-+-+ |
// |     |
// +D----+
// |     |
// +-----+
const createFirstLevel = (): Level => {
  return {
    tiles: [
      [
        new TileBuilder().north('wall').south('wall').west('wall').build(),
        new TileBuilder().north('wall').south('wall').build(),
        new TileBuilder().north('wall').east('wall').build()
      ],
      [
        new TileBuilder().north('wall').south('wall', 'door').west('wall').enemies(createKobold()).build(),
        new TileBuilder().north('wall').south('wall').build(),
        new TileBuilder().south('wall').east('wall').build()
      ],
      [
        new TileBuilder().north('wall', 'door').south('wall').west('wall').build(),
        new TileBuilder().north('wall').south('wall').build(),
        new TileBuilder().north('wall').south('wall').east('wall').build()
      ]
    ],
    startingPoint: { x: 0, y: 0 }
  };
};

export { createFirstLevel };
