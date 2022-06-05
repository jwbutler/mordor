<script type="ts">
  import { CompassDirection } from '../lib/geometry';
  import type { Level } from '../lib/levels';
  import type { Tile } from '../lib/tiles';

  export let level: Level;
  export let currentTile: Tile;
  export let direction: CompassDirection;

  const tileClass = (tile: Tile, currentTile: Tile, currentDirection: CompassDirection): string => {
    const classNames: string[] = ['tile', tile.type];
    if (tile === currentTile) {
      classNames.push('current');
      classNames.push(`${currentDirection}Arrow`);
    }
    return classNames.join(' ');
  };
</script>

<div class="container">
  <div class="map">
    {#each level.tiles as row}
      <div class="row">
        {#each row as tile}
          <div
            class={tileClass(tile, currentTile, direction)}></div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .map {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: stretch;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
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
    background-color: lightgray;
  }

  .wall {
    background-color: darkgray;
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
    .container {
      height: 100%;
      padding: 0;
    }
    .tile {
      height: 100%;
    }
  }
</style>
