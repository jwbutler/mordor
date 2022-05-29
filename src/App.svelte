<script lang="ts">
  import DungeonView from './components/DungeonView.svelte';
  import MapView from './components/MapView.svelte';
  import MessageView from './components/MessageView.svelte';
  import UnitView from './components/UnitView.svelte';
  import { createFirstLevel } from './database/levels';
  import { createPlayerUnit } from './database/units';
  import type { RelativeDirection } from './types/geometry';
  import type { Level } from './types/levels';
  import type { Player } from './types/player';
  import type { Unit } from './types/units';
  import { fight } from './utils/combat';
  import { move, navigate } from './utils/geometry';
  import { onMount, onDestroy } from 'svelte';
  import { getTile } from './utils/levels';
  import { isDoorFacingDirection, isWallLike } from './utils/tiles';

  const level: Level = createFirstLevel();
  // const level: Level = biggerLevel();
  const playerUnit: Unit = createPlayerUnit();
  
  const player: Player = {
    unit: playerUnit,
    coordinates: level.startingPoint,
    direction: 'east'
  };
  
  let tile = level.tiles[player.coordinates.y][player.coordinates.x];

  const render = () => {
    // a dumb trick to get Svelte to re-render
    tile = tile;
  };
  
  let enableInput = true;
  
  const loadTile = async () => {
    if (tile.enemies.length > 0) {
      enableInput = false;
      await fight(
        player.unit,
        tile.enemies[0],
        message => { messages = [...messages, message]; },
        render
      );
      enableInput = true;
    }
  };
  
  let messages: string[] = [];

  const _getRelativeDirection = (e: KeyboardEvent): RelativeDirection | null => {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        return 'forward';
      case 'ArrowLeft':
      case 'KeyA':
        return 'left';
      case 'ArrowRight':
      case 'KeyD':
        return 'right';
      case 'ArrowDown':
      case 'KeyS':
        return 'backward';
      default:
        return null;
    }
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    const relativeDirection = _getRelativeDirection(e);
    if (relativeDirection) {
      await handleNavigate(relativeDirection);
    }
  };
  
  const handleNavigate = async (relativeDirection: RelativeDirection) => {
    if (!enableInput) {
      return;
    }
    const { coordinates, direction } = navigate({
      coordinates: player.coordinates,
      compassDirection: player.direction,
      relativeDirection
    });

    const nextTile = getTile(level, coordinates);
    if (isDoorFacingDirection(nextTile, direction)) {
      player.coordinates = move(coordinates, direction); // assume the developer put a floor tile there...
    } else if (!isWallLike(nextTile, direction)) {
      player.coordinates = coordinates;
    }
    player.direction = direction;
    tile = level.tiles[player.coordinates.y][player.coordinates.x];
    await loadTile();
  };
  
  onMount(() => window.addEventListener('keydown', handleKeyDown));
  onDestroy(() => window.removeEventListener('keydown', handleKeyDown));
  onMount(() => {
    const errorLog = console.error;
    console.error = (x) => { alert(`Error: ${x}`); errorLog(x); };
    const warnLog = console.warn;
    console.warn = (x) => { alert(`Warning: ${x}`); errorLog(x); };
  });
</script>

<main>
  <div class="left">
    <UnitView unit={playerUnit} />
  </div>
  <div class="middle">
    <div class="middleTop">
      <DungeonView
        {tile}
        {level}
        coordinates={player.coordinates}
        direction={player.direction}
        navigate={handleNavigate}
      />
      <MessageView
        messages={messages}
      />
    </div>
    <MapView
      {level}
      currentTile={tile}
      direction={player.direction}
    />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    margin: 10px;
    height: 100%;
  }
  
  .middle {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    height: 100%;
  }
  
  .middleTop {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  
  @media (max-width: 767px) {
    main {
      align-items: center;
      margin: 0;
      gap: 0;
    }
    
    .left {
      display: none;
    }
    
    .middle {
      width: 100%;
      gap: 0;
    }
    
    .middleTop {
      flex-basis: 60%;
    }
    
    @media (orientation: portrait) {
      .middle {
        flex-direction: column;
      }
    }
    
    @media (orientation: landscape) {
      .middle {
        flex-direction: row;
      }
      .middleTop {
        height: 100%;
      }
    }
  }
</style>
