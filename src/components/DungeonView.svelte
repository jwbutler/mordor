<script type="ts">
  import { getDungeonImages } from '../database/dungeonImages';
  import { Coordinates, RelativeDirection } from '../types/geometry';
  import type { CompassDirection } from '../types/geometry';
  import type { Level } from '../types/levels';
  import type { Tile } from '../types/tiles';
  import { rotateLeft, rotateRight } from '../utils/geometry';
  import { getTile, getTilesInView } from '../utils/levels';
  import { isDoor, isDoorFacingDirection, isWall, isWallLike } from '../utils/tiles';
  import ControlsView from './ControlsView.svelte';

  export let tile: Tile;
  export let level: Level;
  export let direction: CompassDirection;
  export let coordinates: Coordinates;
  export let navigate: (relativeDirection: RelativeDirection) => Promise<void>;

  const maxDepth = 4;
  let tiles: Record<string, (Tile | null)[]>;
  $: tiles = getTilesInView(level, coordinates, direction, maxDepth);
  
  type RenderState = {
    left: (string | null)[],
    center: (string | null)[],
    right: (string | null)[],
    doors: (string | null)[],
    unit: (string | null)
  }
  
  const {
    hallsLeft,
    hallsRight,
    wallsCenter,
    wallsLeft,
    wallsRight,
    doors,
    floorCeiling
  } = getDungeonImages();
 
  const getRenderState = (): RenderState => {
    const images: RenderState = {
      left: [],
      center: [],
      right: [],
      doors: [],
      unit: null
    };
    
    for (let i = 0; i < maxDepth; i++) {
      const left = (isWallLike(tiles['left'][i], rotateLeft(direction)))
        ? hallsLeft[i]
        : (isWallLike(tiles['left'][i + 1], direction))
        ? wallsLeft[i]
        : null;
      images['left'].push(left);
      
      const center = (isWall(tiles['center'][i + 1]) || isDoor(tiles['center'][i + 1]))
        ? wallsCenter[i]
        : null;
      images['center'].push(center);
      
      const right = (isWallLike(tiles['right'][i], rotateRight(direction)))
        ? hallsRight[i]
        : (isWallLike(tiles['right'][i + 1], direction))
        ? wallsRight[i]
        : null;
      images['right'].push(right);
      
      const door = (isDoorFacingDirection(tiles['center'][i + 1], direction))
        ? doors[i]
        : null;
    }
  
    const tile = getTile(level, coordinates);
    const enemy = tile?.enemies[0];
    if (enemy?.life > 0) {
      images['unit'] = enemy?.sprite?.image || null;
    }
    
    return images;
  };
  
  let images: RenderState;
  $: {
    images = getRenderState();
    tile; //dependency
  }
  $: console.log(JSON.stringify(images, null, 2));
</script>

<div class="dungeon">
  <img class="unit" alt="" src={floorCeiling} />
  {#each [3,2,1,0] as i}
    {#each ['left', 'center', 'right', 'door'] as category}
      <img class="tile" alt="" src={images[category]?.[i]} />
    {/each}
  {/each}
  <img class="unit"  alt="" src={images['unit']} />
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
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    image-rendering: crisp-edges; /* Firefox */
    image-rendering: pixelated;   /* Chrome */
  }
  img[src=""] {
    display: none;
  }
  .tile {
    border: 1px solid black;
  }
  
  .unit {}
  
  @media (max-width: 767px) {
    .dungeon {
      width: 100%;
      flex-basis: 80%;
    }
  }
</style>
