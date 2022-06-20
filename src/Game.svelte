<script lang="ts">
  import { createCombatHandler } from './classes/CombatHandler';
  import IntroView from "./components/IntroView.svelte";
  import MainColumn from "./components/MainColumn.svelte";
  import UnitView from './components/UnitView.svelte';
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

  const combatHandler = createCombatHandler({ render });

  const loadTile = async () => {
    if (tile.enemies.length > 0 && tile.enemies[0].life > 0) {
      $state.enableInput = false;
      await combatHandler.startCombat(tile.enemies[0], $state);
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
    if (!$state.enableInput || $state.screen === 'COMBAT') {
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

  let middleColumn: HTMLElement;

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (middleColumn) {
      middleColumn.scrollIntoView();
    }
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
</script>

<main>
  {#if $state.screen === 'INTRO'}
    <IntroView onComplete={() => { $state.screen = 'DUNGEON'; }}/>
  {:else}
    <div class="column left">
      <UnitView unit={player.unit} />
    </div>
    <div class="column middle" bind:this={middleColumn}>
      <MainColumn
        {tile}
        {level}
        {player}
        screen={$state.screen}
        messages={$state.messages}
        {combatHandler}
        navigate={handleNavigate}
        setInputEnabled={enabled => { $state.enableInput = enabled; }} 
      />
    </div>
    <div class="column right">
      <pre>{JSON.stringify($state,null,2)}</pre>
    </div>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 20px;
    padding: 20px;
    width: 100%;
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }

  .column {
    height: 100%;
    display: flex;
    flex-direction: column;
    scroll-snap-align: center;
  }

  .middle {
    justify-content: stretch;
    align-items: stretch;
    flex: 1 0 30%;
    gap: 20px;
  }

  .left,.right {
    flex: 0 1 30%;
    align-items: center;
    justify-content: flex-start;
  }

  pre {
    font-family: monospace;
    overflow: auto;
    max-width: 300px;
    background-color: #f0f0f0;
    border: 1px solid black;
    margin: 0;
  }

  @media (max-width: 767px) {
    main {
      align-items: center;
      gap: 0;
      scroll-snap-type: x mandatory;
      overflow-x: auto;
      padding: 0;
    }

    .column {
      width: 100vw;
      flex-shrink: 0;
      padding: 0;
      flex-basis: auto;
      gap: 0;
    }

    @media (orientation: landscape) {
      .middle {
        flex-direction: row;
      }
    }
  }
</style>
