<script lang="ts">
  import DungeonView from './components/DungeonView.svelte';
  import MapView from './components/MapView.svelte';
  import type { Coordinates } from './types/geometry';
  import type { Level } from './types/levels';
  import type { Player } from './types/player';
  import { Tile, TileBuilder } from './types/tiles';
  import type { Unit } from './types/units';
  import { move, rotate180, rotateLeft, rotateRight } from './utils/geometry';
  import { onMount, onDestroy } from 'svelte';

  // +-----+
  // |     |
  // +-+-+ |
  // |     |
  // +D----+
  // |     |
  // +-----+
  const level: Level = {
    tiles: [
      [
        new TileBuilder().north('wall').south('wall').west('wall').build(),
        new TileBuilder().north('wall').south('wall').build(),
        new TileBuilder().north('wall').east('wall').build()
      ],
      [
        new TileBuilder().north('wall').south('wall', 'door').west('wall').build(),
        new TileBuilder().north('wall').south('wall').build(),
        new TileBuilder().south('wall').east('wall').build()
      ],
      [
        new TileBuilder().north('wall', 'door').south('wall').west('wall').build(),
        new TileBuilder().north('wall').south('wall').build(),
        new TileBuilder().north('wall').south('wall').east('wall').build()
      ]
    ]
  };
  
  const playerUnit: Unit = {
    strength: 5,
    dexterity: 5,
    intelligence: 5,
    wisdom: 5,
    constitution: 5,
    charisma: 5
  };
  
  const player: Player = {
    unit: playerUnit,
    coordinates: { x: 0, y: 0 },
    direction: 'east'
  };
  
  let tile: Tile;
  $: tile = level.tiles[player.coordinates.y][player.coordinates.x];
  
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        if (!tile[player.direction].includes('wall') || tile[player.direction].includes('door')) {
          player.coordinates = move(player.coordinates, player.direction);
        }
        break;
      case 'ArrowLeft':
      case 'KeyA':
        player.direction = rotateLeft(player.direction);
        break;
      case 'ArrowRight':
      case 'KeyD':
        player.direction = rotateRight(player.direction);
        break;
      case 'ArrowDown':
      case 'KeyS':
        player.direction = rotate180(player.direction);
        break;
    }
  };
  
  onMount(() => window.addEventListener('keydown', handleKeyDown));
  onDestroy(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<main>
  <DungeonView {tile} direction={player.direction} />
  <MapView {level} currentTile={tile} direction={player.direction} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    width: 640px;
    gap: 20px;
  }
</style>
