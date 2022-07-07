<script lang="ts">
  import { createCombatHandler } from './classes/CombatHandler';
  import IntroView from "./components/IntroView.svelte";
  import UnitView from './components/UnitView.svelte';
  import type { RelativeDirection } from './lib/geometry';
  import { Menu, state } from './stores/state';
  import type { Level } from './lib/levels';
  import type { Player } from './lib/player';
  import { move, navigate } from './lib/geometry';
  import { onMount, onDestroy } from 'svelte';
  import { getRelativeDirection } from './lib/input';
  import { getTile } from './lib/levels';
  import { isDoorFacingDirection, isStairs, isWallLike } from './lib/tiles';
  import DungeonView from './components/DungeonView.svelte';
  import TownView from './components/TownView.svelte';
  import MessageView from './components/MessageView.svelte';
  import CombatView from './components/CombatView.svelte';
  import MinimapView from './components/MinimapView.svelte';
  
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
    if (!$state.enableInput || $state.menu !== null) {
      return;
    }
    
    // playAudio('footstep');

    const { coordinates, direction } = navigate({
      coordinates: $state.player.coordinates,
      compassDirection: $state.player.direction,
      relativeDirection
    });

    const nextTile = getTile(level, coordinates);
    if (isDoorFacingDirection(nextTile, direction)) {
      player.coordinates = move(coordinates, direction); // assume the developer put a floor tile there...
    } else if (isStairs(nextTile)) {
      player.location = 'town';
      player.coordinates = { x: 0, y: 0 };
      if (player.unit.life < player.unit.maxLife || player.unit.mana < player.unit.maxMana) {
        player.unit.life = player.unit.maxLife;
        player.unit.mana = player.unit.maxMana;
        $state.messages = [...$state.messages, 'You feel much better.'];
      }
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
  
  let menu: Menu | null;
  $: menu = $state.menu;
</script>

<main>
  {#if menu === 'INTRO'}
    <IntroView onComplete={() => { $state.screen = 'DUNGEON'; }}/>
  {:else}
    <div class="column left" bind:this={leftColumn}>
      {#if player.location === 'dungeon'} 
        <DungeonView
          {tile}
          level={level}
          coordinates={player.coordinates}
          direction={player.direction}
          {navigate}
          enableNavigation={ $state.menu === null }
          setInputEnabled={enabled => { $state.enableInput = enabled; }}
        />
        <div class="mobile-only">
          {#if $state.menu === 'combat'}
            <CombatView handler={combatHandler} />
          {:else}
            <MinimapView
              {level}
              currentTile={tile}
              coordinates={player.coordinates}
              direction={player.direction}
            />
          {/if}
        </div>
      {:else if player.location === 'town'}
        <TownView onExit={() => {
          $state.player.location = 'dungeon';
          $state.player.coordinates = { ...$state.level.startingPoint };
          tile = level.tiles[player.coordinates.y][player.coordinates.x]; // ugh
        }} />
      {/if}
      <MessageView messages={$state.messages} />
    </div>
    <div class="column right">
      <UnitView unit={player.unit} />
      {#if $state.menu === 'combat'}
        <CombatView handler={combatHandler} />
      {:else if $state.player.location === 'dungeon' }
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
    height: 640px;
    max-width: 1280px;
    margin: 0 auto;
    align-items: center;
    gap: 0;
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    padding: 0;
  }

  .column {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    scroll-snap-align: center;
    width: 100vw;
    flex-shrink: 0;
    padding: 0;
    flex-basis: auto;
  }

  .left {
    align-items: stretch;
  }

  .right {
    align-items: center;
  }

  .left > :nth-child(1) {
    flex: 1 1 auto;
  }

  .left > :nth-child(2) {
    flex: 1 1 auto;
  }

  .left > :nth-child(3) {
    flex: 0 1 auto;
  }

  @media (min-width: 768px) {
    .mobile-only {
      display: none;
    }

    main {
      align-items: stretch;
      gap: 20px;
      padding: 20px;
    }

    .column {
      gap: 20px;
    }

    .left {
      width: 640px;
    }

    .right {
      width: 320px;
    }
  }
</style>
