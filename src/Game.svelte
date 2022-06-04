<script lang="ts">
  import CombatView from './components/CombatView.svelte';
  import DungeonView from './components/DungeonView.svelte';
  import MapView from './components/MapView.svelte';
  import MessageView from './components/MessageView.svelte';
  import UnitView from './components/UnitView.svelte';
  import { startCombat } from './lib/combat';
  import type { RelativeDirection } from './lib/geometry';
  import { state } from './stores/state';
  import type { Level } from './lib/levels';
  import type { Player } from './lib/player';
  import { move, navigate } from './lib/geometry';
  import { onMount, onDestroy } from 'svelte';
  import { getRelativeDirection } from './lib/input';
  import { getTile } from './lib/levels';
  import { isDoorFacingDirection, isWallLike } from './lib/tiles';
  
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
    if (tile.enemies.length > 0 && tile.enemies[0].life >= 0) {
      $state.enableInput = false;
      await startCombat(tile.enemies[0]);
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
</script>

<main>
  <div class="column left">
    <UnitView unit={player.unit} />
  </div>
  <div class="column middle">
    <div class="cell">
      <DungeonView
        {tile}
        level={level}
        coordinates={player.coordinates}
        direction={player.direction}
        navigate={handleNavigate}
      />
      <MessageView messages={$state.messages} />
    </div>
    <div class="cell">
      {#if $state.combat !== null}
        <CombatView
          state={$state.combat}
          sendMessage={message => { $state.messages = [...$state.messages, message]; }}
          {render}
          endCombat={() => { $state.combat = null; } }
        />
      {:else}
        <MapView
          level={level}
          currentTile={tile}
          direction={player.direction}
        />
      {/if}
    </div>
  </div>
  <div class="column right">
    <UnitView unit={player.unit} />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 20px;
    padding: 10px;
    width: 100%;
    height: 100%;
  }

  .column {
    width: 100%;
    height: 100%;
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .middle {
    justify-content: stretch;
    align-items: stretch;
    gap: 10px;
  }
  
  .left,.right {
    align-items: center;
    justify-content: flex-start;
  }

  .cell {
    flex-basis: 100%;
    flex-shrink: 1;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 767px) {
    main {
      align-items: center;
      gap: 0;
    }

    .left {
      display: none;
    }

    .right {
      display: none;
    }
    
    @media (orientation: landscape) {
      .middle {
        flex-direction: row;
      }
    }
  }
</style>
