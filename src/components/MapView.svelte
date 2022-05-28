<script type="ts">
  import { CompassDirection, compassDirectionValues } from '../types/geometry';
  import type { Level } from '../types/levels';
  import type { Tile } from '../types/tiles';
  import { titleCase } from '../utils/strings';

  export let level: Level;
  export let currentTile: Tile;
  export let direction: CompassDirection;

  const tileClass = (tile: Tile, currentTile: Tile, currentDirection: CompassDirection): string => {
    const classNames: string[] = ['tile'];
    if (tile === currentTile) {
      classNames.push('current');
      classNames.push(`${currentDirection}Arrow`);
    }
    for (const direction of compassDirectionValues) {
      if (tile[direction].includes('wall')) {
        classNames.push(`wall${titleCase(direction)}`);
      }
      if (tile[direction].includes('door')) {
        classNames.push(`door${titleCase(direction)}`);
      }
    }
    return classNames.join(' ');
  };
</script>

<div class="container">
  <div class="map">
    {#each level.tiles as row}
      <div class="row">
        {#each row as tile}
          <div class={tileClass(tile, currentTile, direction)}></div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  :root {
    --doorColor: #ff00ff;
  }
  
  .container {
    width: 100%;
    padding: 10%;
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

  .current {
    background-color: #f0f0e0;
  }

  .wallNorth {
    border-top-width: var(--borderWidth);
  }

  .wallSouth {
    border-bottom-width: var(--borderWidth);
  }

  .wallEast {
    border-right-width: var(--borderWidth);
  }

  .wallWest {
    border-left-width: var(--borderWidth);
  }

  .doorNorth {
    border-top-color: var(--doorColor);
  }

  .doorSouth {
    border-bottom-color: var(--doorColor);
  }

  .doorEast {
    border-right-color: var(--doorColor);
  }

  .doorWest {
    border-left-color: var(--doorColor);
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
      flex-basis: 50%;
      height: 100%;
    }
  }
</style>
