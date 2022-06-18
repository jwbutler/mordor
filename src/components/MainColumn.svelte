<script type="ts">
  import type { CombatHandler } from '../classes/CombatHandler';
  import { Level } from '../lib/levels';
  import { Player } from '../lib/player';
  import type { Tile } from '../lib/tiles';
  import CombatView from './CombatView.svelte';
  import DungeonView from './DungeonView.svelte';
  import MinimapView from './MinimapView.svelte';
  import MessageView from './MessageView.svelte';
  import { state } from '../stores/state';
  
  export let tile: Tile;
  export let player: Player;
  export let level: Level;
  export let combatHandler: CombatHandler;
  export let navigate: () => void;
  export let movementEnabled: boolean;
  export let setInputEnabled: (enabled: boolean) => void;
</script>

<div class="column">
  <div class="cell">
    <DungeonView
      {tile}
      level={level}
      coordinates={player.coordinates}
      direction={player.direction}
      {navigate}
      {movementEnabled}
      {setInputEnabled}
    />
    <MessageView messages={$state.messages} />
  </div>
  <div class="cell">
    {#if $state.inCombat}
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
</div>

<style>
  .column {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    flex: 1 0 30%;
    gap: 20px;
  }
  
  .cell {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-basis: 100%;
  }
  
  @media (max-width: 767px) {
    .column {
      gap: 0;
    }
    .cell {
      gap: 0;
    }
  }
</style>
