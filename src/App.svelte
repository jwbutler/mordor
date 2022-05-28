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
  import { Tile } from './types/tiles';
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
  <UnitView unit={playerUnit} />
  <div class="middle">
    <DungeonView
      {tile}
      direction={player.direction}
      navigate={handleNavigate}
    />
    <MessageView
      messages={messages}
    />
    <MapView
      {level}
      currentTile={tile}
      direction={player.direction}
    />
  </div>
</main>

<style>
  :root {
    --width: 320px;
    --height: 240px;
  }
  main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
  }
  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  @media (max-width: 767px) {
    main {
      flex-direction: column-reverse;
      align-items: center;
    }
  }
</style>
