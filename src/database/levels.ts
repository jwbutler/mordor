import type { Coordinates } from '../lib/geometry';
import type { Level } from '../lib/levels';
import type { Tile } from '../lib/tiles';
import { createKobold, createCrocDog, createMudMan } from './units';

const floor = (): Tile => ({ type: 'floor', enemies: [], objects: [] });
const wall = (): Tile => ({ type: 'wall', enemies: [], objects: [] });
const horizontalDoor = (): Tile => ({ type: 'door_horizontal', enemies: [], objects: [] });
const verticalDoor = (): Tile => ({ type: 'door_vertical', enemies: [], objects: [] });
const stairs = (): Tile => ({ type: 'stairs', enemies: [], objects: [] });

const fromString = (data: string, startingPoint: Coordinates): Level => {
  const tiles: Tile[][] = [];
  const rows = data.split('\n');
  const height = rows.length;
  
  for (let y = 0; y < height; y++) {
    const row: Tile[] = [...rows[y].trim()].map(char => {
      switch (char) {
        case '#': return wall();
        case '|': return horizontalDoor();
        case '-': return verticalDoor();
        case 'S': return stairs();
        case 'C': return { type: 'floor', enemies: [createCrocDog()], objects: [] };
        case 'K': return { type: 'floor', enemies: [createKobold()], objects: [] };
        case 'M': return { type: 'floor', enemies: [createMudMan()], objects: [] };
        default:  return floor();
      }
    });
    if (row.length > 0) {
      tiles.push(row);
    }
  }

  return {
    tiles,
    width: tiles[0].length,
    height: tiles.length,
    startingPoint
  };
};

const createFirstLevel = (): Level => {
  const data = `
    #######
    #    K#
    #####K#
    #KKKKK#
    #-#####
    #     #
    #######
  `;
  return fromString(data, { x: 1, y: 1 });
};

const smallerLevel = (): Level => {
  const data = `
    #####
    # K #
    ### #
    #####
  `;
  return fromString(data, { x: 1, y: 1 });
};

const biggerLevel = () => {
  const data = `
    ################
    #M   ######  K##
    #### ###    # ##
    #K## # # #### M#
    # C  # # ## K ##
    # ##  K  ## # ##
    # K####     ####
    ##   C  ###    S
    ################
  `;
  return fromString(data, { x: 14, y: 7 }); 
};

export {
  createFirstLevel,
  biggerLevel,
  smallerLevel
};
