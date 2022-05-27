<script lang="ts">
  import ControlsView from "./components/ControlsView.svelte";
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
  
  let tile: Tile;
  $: tile = level.tiles[player.coordinates.y][player.coordinates.x];
  
  let messages: string[] = [];
  
  const loadTile = async () => {
    messages = [...messages, `Navigated to (${player.coordinates.x},${player.coordinates.y})`];
    if (tile.enemies.length > 0) {
      await fight(player.unit, tile.enemies[0], messages.push);
    }
  };

  const _getRelativeDirection = (e: KeyboardEvent): RelativeDirection => {
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
    }
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    const relativeDirection = _getRelativeDirection(e);
    
    return handleNavigate(relativeDirection);
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
    await loadTile();
  };
  
  onMount(() => window.addEventListener('keydown', handleKeyDown));
  onDestroy(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<main>
  <DungeonView {tile} direction={player.direction} navigate={handleNavigate} />
  <MessageView messages={messages} />
  <MapView {level} currentTile={tile} direction={player.direction} />
  <UnitView unit={playerUnit} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    width: 512px;
    gap: 20px;
  }
</style>
