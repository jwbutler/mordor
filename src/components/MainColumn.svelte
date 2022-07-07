<script type="ts">
  /*
   * TODO - this should probably use slots and accept components from the Game component. 
   */
  import type { CombatHandler } from '../classes/CombatHandler';
  import { Level } from '../lib/levels';
  import { Player } from '../lib/player';
  import type { Tile } from '../lib/tiles';
  import type { Screen } from '../stores/state';
  import CombatView from './CombatView.svelte';
  import DungeonView from './DungeonView.svelte';
  import MinimapView from './MinimapView.svelte';
  import MessageView from './MessageView.svelte';
  import TownView from './TownView.svelte';
  
  export let tile: Tile;
  export let player: Player;
  export let level: Level;
  export let screen: Screen;
  export let messages: string[];
  export let combatHandler: CombatHandler;
  export let navigate: () => void;
  export let setInputEnabled: (enabled: boolean) => void;
</script>

<div class="column">
  <div class="cell">
  </div>
  <div class="cell">
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
