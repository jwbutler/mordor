<script lang="ts">
  import DungeonView from './components/DungeonView.svelte';
  import MapView from './components/MapView.svelte';
  import MessageView from './components/MessageView.svelte';
  import UnitView from './components/UnitView.svelte';
  import type { RelativeDirection } from './types/geometry';
  import { state } from './stores/state';
  import type { Level } from './types/levels';
  import type { Player } from './types/player';
  import { fight } from './utils/combat';
  import { move, navigate } from './utils/geometry';
  import { onMount, onDestroy } from 'svelte';
  import { getRelativeDirection } from './utils/input';
  import { getTile } from './utils/levels';
  import { isDoorFacingDirection, isWallLike } from './utils/tiles';
  
  let tile = $state.level.tiles[$state.player.coordinates.y][$state.player.coordinates.x];
  let player: Player;
  $: player =  $state.player;
  let level: Level;
  $: level = $state.level;

  const render = () => {
    // a dumb trick to get Svelte to re-render
    tile = tile;
  };
  
  const loadTile = async () => {
    if (tile.enemies.length > 0) {
      $state.enableInput = false;
      await fight(
        player.unit,
        tile.enemies[0],
        message => { $state.messages = [...$state.messages, message]; },
        render
      );
      $state.enableInput = true;
    }
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    const relativeDirection = getRelativeDirection(e);
    if (relativeDirection) {
      await handleNavigate(relativeDirection);
    }
  };
  
  const handleNavigate = async (relativeDirection: RelativeDirection) => {
    if (!$state.enableInput) {
      return;
    }
    const { coordinates, direction } = navigate({
      coordinates: $state.player.coordinates,
      compassDirection: $state.player.direction,
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
    <UnitView unit={player.unit} />
  </div>
  <div class="middle">
    <div class="middleTop">
      <DungeonView
        {tile}
        level={level}
        coordinates={player.coordinates}
        direction={player.direction}
        navigate={handleNavigate}
      />
      <MessageView messages={$state.messages} />
    </div>
    <MapView
      level={level}
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
