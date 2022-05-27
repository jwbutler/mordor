<script type="ts">
  import { RelativeDirection } from '../types/geometry';
  import type { CompassDirection } from '../types/geometry';
  import type { Tile } from '../types/tiles';
  import floor from '../assets/floor_ceiling.png';
  import left_wall from '../assets/left_wall.png';
  import middle_door from '../assets/middle_door.png';
  import middle_wall from '../assets/middle_wall.png';
  import right_wall from '../assets/right_wall.png';
  import ControlsView from './ControlsView.svelte';
  
  export let tile: Tile;
  export let direction: CompassDirection;
  export let navigate: (relativeDirection: RelativeDirection) => Promise<void>;
  export let ticks: number;

  let middleImage;
  $: {
    if (tile[direction].includes('wall')) {
      middleImage = middle_wall;
    } else {
      middleImage = null;
    }
  }

  let doorImage;
  $: {
    if (tile[direction].includes('door')) {
      doorImage = middle_door;
    } else {
      doorImage = null;
    }
  }
  
  let unitImage;
  $: {
    const enemy = tile.enemies[0];
    console.log(enemy);
    if (enemy?.life > 0) {
      unitImage = enemy.sprite?.image || null;
    } else {
      unitImage = null;
    }
  }

  const leftImage = left_wall;
  const rightImage = right_wall;
  const floorImage = floor;
</script>

<div class="dungeon">
  <img class="tile" src={floorImage} />
  <img class="tile" src={leftImage} />
  <img class="tile" src={rightImage} />
  {#if middleImage !== null}
    <img class="tile" src={middleImage} />
  {/if}
  {#if doorImage !== null}
    <img class="tile" src={doorImage} />
  {/if}
  {#if unitImage !== null}
    <img class="unit" src={unitImage} />
  {/if}
  <ControlsView {navigate} />
</div>

<style>
  :root {
    --width: 320px;
    --height: 240px;
  }
  .dungeon {
    position: relative;
    width: var(--width);
    max-width: 100vw;
    aspect-ratio: 4/3;
    border: 1px solid black;
  }
  img {
    position: absolute;
    image-rendering: crisp-edges; /* Firefox */
    image-rendering: pixelated;   /* Chrome */
  }
  .tile {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 1px solid black;
  }
  .unit {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
