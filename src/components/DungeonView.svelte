<script type="ts">
  import type { CompassDirection } from '../types/geometry';
  import type { Tile } from '../types/tiles';
  import floor from '../assets/floor_ceiling.png';
  import left_wall from '../assets/left_wall.png';
  import middle_door from '../assets/middle_door.png';
  import middle_wall from '../assets/middle_wall.png';
  import right_wall from '../assets/right_wall.png';
  
  export let tile: Tile;
  export let direction: CompassDirection;

  let middleImage;
  let doorImage;
  let unitImage;
  $: {
    if (tile[direction].includes('wall')) {
      middleImage = middle_wall;
    } else {
      middleImage = null;
    }
    if (tile[direction].includes('door')) {
      doorImage = middle_door;
    } else {
      doorImage = null;
    }
    unitImage = tile.enemies[0]?.sprite?.image || null;
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
</div>

<style>
  .dungeon {
    position: relative;
    width: 512px;
    height: 384px;
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
    width: 512px;
    height: 384px;
    border: 1px solid black;
  }
  .unit {
    width: 512px;
    height: 384px;
    left: 0;
    top: 0;
  }
</style>
