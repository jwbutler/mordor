<script lang="ts">
  import { biggerLevel, createFirstLevel } from './database/levels';
  import { createPlayerUnit } from './database/units';
  import Game from './Game.svelte';
  import { initialize as initializeState } from './stores/state';
  import type { Level } from './lib/levels';
  import type { Player } from './lib/player';
  import type { Unit } from './lib/units';

  const level: Level = biggerLevel();
  const playerUnit: Unit = createPlayerUnit();
  
  const player: Player = {
    unit: playerUnit,
    coordinates: level.startingPoint,
    direction: 'east'
  };
  
  initializeState({ level, player });
</script>

<Game />
