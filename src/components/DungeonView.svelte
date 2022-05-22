<script type="ts">
  import type { Direction } from '../types/geometry';
  import type { Tile } from '../types/tiles';
  import ceiling from '../assets/ceiling.png';
  import floor from '../assets/floor.png';
  import left_wall from '../assets/left_wall.png';
  import middle_door from '../assets/middle_door.png';
  import middle_empty from '../assets/middle_empty.png';
  import middle_wall from '../assets/middle_wall.png';
  import right_wall from '../assets/right_wall.png';
  
  export let tile: Tile;
  export let direction: Direction;

  let middleImage;
  $: {
    if (tile[direction].includes('door')) {
      middleImage = middle_door;
    } else if (tile[direction].includes('wall')) {
      middleImage = middle_wall;
    } else {
      middleImage = middle_empty;
    }
  }

  const leftImage = left_wall; // TODO
  const rightImage = right_wall; // TODO
  const bottomImage = floor;
  const topImage = ceiling;
  
</script>

<div class="dungeon">
  <img src={topImage} />
  <img src={leftImage} />
  <img src={middleImage} />
  <img src={rightImage} />
  <img src={bottomImage} />
</div>

<style>
  .dungeon {
    position: relative;
    width: 320px;
    height: 160px;
    border: 1px solid black;
  }
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 320px;
    height: 160px;
    image-rendering: crisp-edges; /* Firefox */
    image-rendering: pixelated;   /* Chrome */
    border: 1px solid black;
  }
</style>
