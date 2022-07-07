<script type="ts">
  import { onMount } from 'svelte';
  import { getDungeonImages } from '../database/dungeonImages';
  import { transition } from '../lib/animations';
  import { Coordinates, RelativeDirection } from '../lib/geometry';
  import type { CompassDirection } from '../lib/geometry';
  import type { Level } from '../lib/levels';
  import type { Tile } from '../lib/tiles';
  import { rotateLeft, rotateRight } from '../lib/geometry';
  import { createImage } from '../lib/images';
  import { getTile, getTilesInView } from '../lib/levels';
  import { isDoor, isDoorFacingDirection, isStairs, isWall, isWallLike } from '../lib/tiles';
  import ControlsView from './ControlsView2.svelte';

  export let tile: Tile;
  export let level: Level;
  export let direction: CompassDirection;
  export let coordinates: Coordinates;
  export let navigate: (relativeDirection: RelativeDirection) => Promise<void>;
  export let enableNavigation: boolean;
  export let setInputEnabled: (enabled: boolean) => void;

  const maxDepth = 4;
  let tiles: Record<string, (Tile | null)[]>;
  $: tiles = getTilesInView(level, coordinates, direction, maxDepth);
  
  type RenderState = {
    floorCeiling,
    left: (string | null)[],
    center: (string | null)[],
    right: (string | null)[],
    doors: (string | null)[],
    stairs: (string | null)[],
    unit: (string | null)
  }
  
  const {
    hallsLeft,
    hallsRight,
    wallsCenter,
    wallsLeft,
    wallsRight,
    doors,
    stairs,
    floorCeiling
  } = getDungeonImages();
 
  const getRenderState = (): RenderState => {
    const images: RenderState = {
      floorCeiling,
      left: [],
      center: [],
      right: [],
      doors: [],
      stairs: [],
      unit: null
    };
    
    for (let i = 0; i < maxDepth; i++) {
      const left = (isWallLike(tiles['left'][i], rotateLeft(direction)) || isDoor(tiles['left'][i]))
        ? hallsLeft[i]
        : (isWallLike(tiles['left'][i + 1], direction))
        ? wallsLeft[i]
        : null;
      images['left'].push(left);
      
      const center = (isWall(tiles['center'][i + 1]) || isDoor(tiles['center'][i + 1]) || isStairs(tiles['center'][i + 1]))
        ? wallsCenter[i]
        : null;
      images['center'].push(center);
      
      const right = (isWallLike(tiles['right'][i], rotateRight(direction)) || isDoor(tiles['right'][i]))
        ? hallsRight[i]
        : (isWallLike(tiles['right'][i + 1], direction))
        ? wallsRight[i]
        : null;
      images['right'].push(right);
      
      const door = (isDoorFacingDirection(tiles['center'][i + 1], direction))
        ? doors[i]
        : null;
      images['doors'].push(door);
      
      const stair = (tiles['center'][i + 1]?.type === 'stairs')
        ? stairs[i]
        : null;
      images['stairs'].push(stair);
    }
  
    const tile = getTile(level, coordinates);
    const enemy = tile?.enemies[0];
    if (enemy?.life > 0) {
      images['unit'] = enemy?.sprite?.image || null;
    }
    
    return images;
  };
  
  let canvasElement: HTMLCanvasElement;
  let bufferElement: HTMLCanvasElement;
  
  const drawImage = async (src: string, context: CanvasRenderingContext2D) => {
    const imageData = await createImage(src);
    context.putImageData(imageData, 0, 0);
  };
  
  const render = async (images: RenderState, doTransition: boolean) => {
    if (!bufferElement || !canvasElement) {
      return;
    }
    
    setInputEnabled(false);
    
    const bufferContext = bufferElement.getContext('2d') as CanvasRenderingContext2D;
    bufferContext.fillStyle = 'black';
    await drawImage(images.floorCeiling, bufferContext);

    for (let i = 3; i >= 0; i--) {
      for (const category of ['left', 'center', 'right', 'doors', 'stairs']) {
        const image = images[category]?.[i];
        if (image) {
          await drawImage(image, bufferContext);
        }
      }
    }
    if (images.unit !== null) {
      await drawImage(images.unit, bufferContext);
    }

    if (doTransition) {
      await transition({
        source: bufferElement,
        dest: canvasElement,
        delay: 50,
        frames: 2
      });
    } else {
      const imageData = bufferContext.getImageData(0, 0, bufferElement.width, bufferElement.height);
      canvasElement.getContext('2d').putImageData(imageData, 0, 0);
    }
    
    setInputEnabled(true);
  };
  
  $: {
    const images = getRenderState();
    render(images, true);
    tile; //dependency
  }
  
  onMount(() => {
    const images = getRenderState();
    render(images, false);
  });

</script>

<div class="container">
  <canvas class="dungeon" bind:this={canvasElement} width={640} height={480}>
  </canvas>
  {#if enableNavigation}
    <ControlsView {navigate} />
  {/if}
  <canvas class="buffer" bind:this={bufferElement} width={640} height={480}></canvas>
</div>

<style>
  .container {
    position: relative;
    width: 640px;
    height: 480px;
  }
  .dungeon {
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .buffer {
    display: none;
  }
  
  @media (max-width: 767px) {
    .container {
      width: 100%;
      height: initial;
    }
    .dungeon {
      border-radius: 0;
    }
  }
</style>
