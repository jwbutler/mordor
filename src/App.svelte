<script lang="ts">
  import DungeonView from './components/DungeonView.svelte';
  import MapView from './components/MapView.svelte';
  import UnitView from './components/UnitView.svelte';
  import { NoobSword } from './types/items';
  import type { Level } from './types/levels';
  import type { Player } from './types/player';
  import { koboldSprite } from './types/sprites';
  import { Tile, TileBuilder } from './types/tiles';
  import type { Unit } from './types/units';
  import { move, rotate180, rotateLeft, rotateRight } from './utils/geometry';
  import { onMount, onDestroy } from 'svelte';
  
  const kobold: Unit = {
    name: 'Kobold',
    level: 1,
    stats: {
      strength: 3,
      dexterity: 5,
      intelligence: 3,
      wisdom: 2,
      constitution: 2
    },
    equipment: {
      mainHand: NoobSword
    },
    sprite: koboldSprite
  };

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
        new TileBuilder().north('wall').south('wall', 'door').west('wall').enemies(kobold).build(),
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
    name: 'Chigz Jupsiz',
    level: 1,
    stats: {
      strength: 5,
      dexterity: 5,
      intelligence: 5,
      wisdom: 5,
      constitution: 5
    },
    equipment: {
      mainHand: NoobSword
    },
    sprite: koboldSprite
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
  <UnitView unit={playerUnit} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    width: 640px;
    gap: 20px;
  }
</style>
