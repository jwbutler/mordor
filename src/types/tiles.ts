import type { CompassDirection } from './geometry';
import type { MapObject } from './objects';
import type { Unit } from './units';

type TileFeature = 'wall' | 'door';

type Tile = Record<CompassDirection, TileFeature[]> & {
  enemies: Unit[],
  objects: MapObject[]
};

class TileBuilder {
  private readonly tile: Tile = {
    north: [],
    south: [],
    east: [],
    west: [],
    enemies: [],
    objects: []
  };
  
  north = (...features: TileFeature[]) => {
    this.tile.north.push(...features);
    return this;
  };
  
  south = (...features: TileFeature[]) => {
    this.tile.south.push(...features);
    return this;
  };
  
  east = (...features: TileFeature[]) => {
    this.tile.east.push(...features);
    return this;
  };

  west = (...features: TileFeature[]) => {
    this.tile.west.push(...features);
    return this;
  };

  enemies = (...enemies: Unit[]) => {
    this.tile.enemies.push(...enemies);
    return this;
  };
  
  objects = (...objects: MapObject[]) => {
    this.tile.objects.push(...objects);
    return this;
  };
  
  build = () => ({ ...this.tile });
}

export type { Tile };
export { TileBuilder };
