<script type="ts">
  import { Coordinates, RelativeDirection } from '../types/geometry';
  import type { CompassDirection } from '../types/geometry';
  import type { Level } from '../types/levels';
  import type { Tile } from '../types/tiles';
  import hall_left_0 from '../assets/gen/hall_left_0.png';
  import hall_left_1 from '../assets/gen/hall_left_1.png';
  import hall_left_2 from '../assets/gen/hall_left_2.png';
  import hall_left_3 from '../assets/gen/hall_left_3.png';
  import hall_right_0 from '../assets/gen/hall_right_0.png';
  import hall_right_1 from '../assets/gen/hall_right_1.png';
  import hall_right_2 from '../assets/gen/hall_right_2.png';
  import hall_right_3 from '../assets/gen/hall_right_3.png';
  import wall_center_1 from '../assets/gen/wall_center_1.png';
  import wall_left_1 from '../assets/gen/wall_left_1.png';
  import wall_right_1 from '../assets/gen/wall_right_1.png';
  import floor_ceiling from '../assets/floor_ceiling.png';
  import middle_door from '../assets/middle_door.png';
  import { move, rotateLeft, rotateRight } from '../utils/geometry';
  import { getTile } from '../utils/levels';
  import ControlsView from './ControlsView.svelte';
  
  export let tile: Tile;
  export let level: Level;
  export let direction: CompassDirection;
  export let coordinates: Coordinates;
  export let navigate: (relativeDirection: RelativeDirection) => Promise<void>;
  
  $: tile_1_ahead = getTile(level, move(coordinates, direction));
  $: tile_2_ahead = getTile(level, move(coordinates, direction, 2));
  $: tile_3_ahead = getTile(level, move(coordinates, direction, 3));
  $: tile_left = getTile(level, move(coordinates, rotateLeft(direction)));
  $: tile_left_1_ahead = getTile(level, move(move(coordinates, rotateLeft(direction)), direction));
  $: tile_left_2_ahead = getTile(level, move(move(coordinates, rotateLeft(direction)), direction, 2));
  $: tile_left_3_ahead =  getTile(level, move(move(coordinates, rotateLeft(direction)), direction, 3));
  $: tile_right = getTile(level, move(coordinates, rotateRight(direction)));
  $: tile_right_1_ahead = getTile(level, move(move(coordinates, rotateRight(direction)), direction));
  $: tile_right_2_ahead = getTile(level, move(move(coordinates, rotateRight(direction)), direction, 2));
  $: tile_right_3_ahead =  getTile(level, move(move(coordinates, rotateRight(direction)), direction, 3));

  $: left_0 = ((tile[rotateLeft(direction)].includes('wall')))
    ? hall_left_0
    : ((tile_left?.[direction].includes('wall')))
    ? wall_left_1 // TODO
    : null;
  
  $: center_0 = ((tile[direction]?.includes('wall')))
    ? wall_center_1
    : null;  
  
  $: right_0 = ((tile[rotateRight(direction)].includes('wall')))
    ? hall_right_0
    : ((tile_right?.[direction].includes('wall')))
    ? wall_right_1 // TODO
    : null;

  $: door_0 = ((tile[direction].includes('door')))
    ? middle_door
    : null;
  
  $: left_1 = ((tile_1_ahead?.[rotateLeft(direction)].includes('wall')))
    ? hall_left_1
    : ((tile_left_1_ahead?.[direction].includes('wall')))
    ? null // TODO
    : null;

  $: center_1 = ((tile_1_ahead?.[direction].includes('wall')))
    ? null // TODO
    : null;
  
  $: right_1 = ((tile_1_ahead?.[rotateRight(direction)].includes('wall')))
    ? hall_right_1
    : ((tile_right_1_ahead?.[direction].includes('wall')))
    ? null // TODO
    : null;
  
  $: left_2 = ((tile_2_ahead?.[rotateLeft(direction)].includes('wall')))
    ? hall_left_2
    : ((tile_left_2_ahead?.[direction].includes('wall')))
    ? null // TODO
    : null;
  
  $: center_2 = ((tile_2_ahead?.[rotateLeft(direction)].includes('wall')))
    ? null // TODO
    : null;
  
  $: right_2 = ((tile_2_ahead?.[rotateRight(direction)].includes('wall')))
    ? hall_right_2
    : ((tile_left_2_ahead?.[direction].includes('wall')))
    ? null // TODO
    : null;

  $: left_3 = ((tile_3_ahead?.[rotateLeft(direction)].includes('wall')))
    ? hall_left_3
    // : ((tile_left_3_ahead[direction].includes('wall')))
    // ? null // TODO
    : null;
  
  $: center_3 = ((tile_3_ahead?.[direction].includes('wall')))
    ? null // TODO
    : null;
  
  $: right_3 = ((tile_3_ahead?.[rotateRight(direction)].includes('wall')))
    ? hall_right_3
    // : ((tile_left_3_ahead[direction].includes('wall')))
    // ? null // TODO
    : null;

  let unitImage;
  $: {
    const enemy = tile.enemies[0];
    if (enemy?.life > 0) {
      unitImage = enemy.sprite?.image || null;
    } else {
      unitImage = null;
    }
  }
</script>

<div class="dungeon">
  <img class="tile" src={floor_ceiling || ""} />
  <img class="tile" src={left_3 || ""} />
  <img class="tile" src={center_3 || ""} />
  <img class="tile" src={right_3 || ""} />
  <img class="tile" src={left_2 || ""} />
  <img class="tile" src={center_2 || ""} />
  <img class="tile" src={right_2 || ""} />
  <img class="tile" src={left_1 || ""} />
  <img class="tile" src={center_1 || ""} />
  <img class="tile" src={right_1 || ""} />
  <img class="tile" src={left_0 || ""} />
  <img class="tile" src={center_0 || ""} />
  <img class="tile" src={right_0 || ""} />
  <img class="tile" src={door_0 || ""} />
  <img class="unit" src={unitImage || ""} />
  <ControlsView {navigate} />
</div>

<style>
  .dungeon {
    position: relative;
    width: var(--dungeonWidth);
    height: var(--dungeonHeight);
    border: 1px solid black;
  }
  img {
    position: absolute;
    image-rendering: crisp-edges; /* Firefox */
    image-rendering: pixelated;   /* Chrome */
  }
  img[src=""] {
    display: none;
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
  
  @media (max-width: 767px) {
    .dungeon {
      width: 100%;
      flex-basis: 80%;
    }
  }
</style>
