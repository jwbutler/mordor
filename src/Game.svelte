<script lang="ts">
  import { createCombatHandler } from './classes/CombatHandler';
  import IntroView from "./components/IntroView.svelte";
  import UnitView from './components/UnitView.svelte';
  import type { RelativeDirection } from './lib/geometry';
  import { Screen, state } from './stores/state';
  import type { Level } from './lib/levels';
  import type { Player } from './lib/player';
  import { move, navigate } from './lib/geometry';
  import { onMount, onDestroy } from 'svelte';
  import { getRelativeDirection } from './lib/input';
  import { getTile } from './lib/levels';
  import { isDoorFacingDirection, isWallLike } from './lib/tiles';
  import DungeonView from './components/DungeonView.svelte';
  import TownView from './components/TownView.svelte';
  import MessageView from './components/MessageView.svelte';
  import CombatView from './components/CombatView.svelte';
  import MinimapView from './components/MinimapView.svelte';
  import footstep from './assets/footstep.mp3';
  import { playAudio } from './lib/sounds';

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
    
    playAudio('footstep');

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

  let leftColumn: HTMLElement;

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (leftColumn) {
      leftColumn.scrollIntoView();
    }
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
  
  let screen: Screen;
  $: screen = $state.screen;
</script>

<main>
  {#if screen === 'INTRO'}
    <IntroView onComplete={() => { $state.screen = 'DUNGEON'; }}/>
  {:else}
    <div class="column left" bind:this={leftColumn}>
      {#if screen === 'DUNGEON' || screen === 'COMBAT'} 
        <DungeonView
          {tile}
          level={level}
          coordinates={player.coordinates}
          direction={player.direction}
          {navigate}
          {screen}
          setInputEnabled={enabled => { $state.enableInput = enabled; }}
        />
      {:else if screen === 'TOWN'}
        <TownView onExit={() => $state.screen === 'DUNGEON'} />
      {/if}
      <MessageView messages={$state.messages} />
    </div>
    <div class="column right">
      <UnitView unit={player.unit} />
      {#if screen === 'COMBAT'}
        <CombatView handler={combatHandler} />
      {:else if screen === 'DUNGEON'}
        <MinimapView
          {level}
          currentTile={tile}
          coordinates={player.coordinates}
          direction={player.direction}
        />
      {/if}
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
    height: 640px;
    max-width: 1280px;
    margin: 0 auto;
  }

  .column {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    scroll-snap-align: center;
  }

  .left {
    align-items: stretch;
    width: 640px;
  }

  .right {
    align-items: center;
    width: 320px;
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
