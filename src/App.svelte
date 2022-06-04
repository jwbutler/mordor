<script lang="ts">
  import { createFirstLevel } from './database/levels';
  import { createPlayerUnit } from './database/units';
  import Game from './Game.svelte';
  import { initialize as initializeState } from './stores/state';
  import type { Level } from './types/levels';
  import type { Player } from './types/player';
  import type { Unit } from './types/units';

  const level: Level = createFirstLevel();
  // const _level: Level = biggerLevel();
  const playerUnit: Unit = createPlayerUnit();
  
  const player: Player = {
    unit: playerUnit,
    coordinates: level.startingPoint,
    direction: 'east'
  };
  
  initializeState({ level, player });
</script>

<main>
  <Game {level} {player} />
</main>

<style>
</style>
