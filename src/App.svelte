<script lang="ts">
  import DungeonView from './components/DungeonView.svelte';
  import MapView from './components/MapView.svelte';
  import MessageView from "./components/MessageView.svelte";
  import UnitView from './components/UnitView.svelte';
  import { createFirstLevel } from './database/levels';
  import { createPlayerUnit } from './database/units';
  import type { RelativeDirection } from './types/geometry';
  import type { Level } from './types/levels';
  import type { Player } from './types/player';
  import type { Unit } from './types/units';
  import { fight } from './utils/combat';
  import { navigate } from './utils/geometry';
  import { onMount, onDestroy } from 'svelte';

  const level: Level = createFirstLevel();
  const playerUnit: Unit = createPlayerUnit();
  
  const player: Player = {
    unit: playerUnit,
    coordinates: { x: 0, y: 0 },
    direction: 'east'
  };
  
  let tile = level.tiles[player.coordinates.y][player.coordinates.x];

  const render = () => {
    tile = tile;
  };
  
  const loadTile = async () => {
    if (tile.enemies.length > 0) {
      await fight(
        player.unit,
        tile.enemies[0],
        message => { messages = [...messages, message]; },
        render
      );
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
    const { coordinates, direction } = navigate({
      coordinates: player.coordinates,
      compassDirection: player.direction,
      relativeDirection
    });

    if (!tile[direction].includes('wall') || tile[direction].includes('door')) {
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
  <div class="left">
    <UnitView unit={playerUnit} />
  </div>
  <div class="middle">
    <div class="middleTop">
      <DungeonView
        {tile}
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
    align-items: center;
    gap: 20px;
    height: 100%;
  }
  
  .middleTop {
    flex-basis: 50%;
    width: 100%;
    height: 100%;
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
    
    @media (orientation: portrait) {
      .middle {
        flex-direction: column;
      }
    }
    
    @media (orientation: landscape) {
      .middle {
        flex-direction: row;
      }
    }
  }
</style>
