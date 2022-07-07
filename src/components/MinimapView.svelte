<script type="ts">
  import { CompassDirection, Coordinates } from '../lib/geometry';
  import type { Level } from '../lib/levels';
  import type { Tile } from '../lib/tiles';

  export let level: Level;
  export let currentTile: Tile;
  export let coordinates: Coordinates;
  export let direction: CompassDirection;

  const tileClass = (tile: Tile | null, currentTile: Tile, currentDirection: CompassDirection): string => {
    const classNames: string[] = ['tile', tile?.type || 'wall'];
    if (tile === currentTile) {
      classNames.push('current');
      classNames.push(`${currentDirection}Arrow`);
    }
    return classNames.join(' ');
  };
  
  const radius = 3;
  let visibleTiles: (Tile | null)[][];
  $: {
    visibleTiles = [];
    // TODO this probably doesn't handle every case
    const minY = coordinates.y - radius;
    const maxY = coordinates.y + radius;
    const minX = coordinates.x - radius;
    const maxX = coordinates.x + radius;
    
    for (let y = minY; y <= maxY; y++) {
      const row: (Tile | null)[] = [];
      for (let x = minX; x <= maxX; x++) {
        row.push(level.tiles[y]?.[x] || null);
      }
      visibleTiles.push(row);
    }
  }
</script>

<div class="map">
  {#each visibleTiles as row,y}
    <div class="row">
      {#each row as tile,x}
        <div id={`${x}_${y}`} class={tileClass(tile, currentTile, direction)}>  
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .map {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 320px;
    align-items: stretch;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    background-color: darkgray;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-basis: 100%;
  }

  .tile {
    border: 0 solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 100%;
  }

  .tile.current {
    background-color: #f0f0e0;
  }

  .floor {
    background-color: #c0c0c0;
  }

  .wall {
    background-color: #808080;
  }

  .stairs {
    background-color: #f00080;
  }

  .door_horizontal,.door_vertical {
    background-color: brown;
  }

  .northArrow::after {
    content: '↑'; 
  }

  .southArrow::after {
    content: '↓'; 
  }

  .eastArrow::after {
    content: '→'; 
  }

  .westArrow::after {
    content: '←'; 
  }
  
  @media (max-width: 767px) {
    .map {
      border-radius: 0;
    }
    .tile {
      height: 100%;
    }
  }
</style>
