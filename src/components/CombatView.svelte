<script type="ts">
  import { playTurn } from '../lib/combat';
  import type { CombatState } from '../stores/state';

  export let state: CombatState;
  export let sendMessage: (message: string) => void;
  export let render: () => Promise<void>;
  export let endCombat: () => void;
</script>

<div class="combat">
  <div>{state.attacker.name}</div>
  <div>{state.defender.name}</div>
  <button on:click={() => playTurn({ state, sendMessage, render, endCombat })}>
    fight
  </button>
</div>

<style>
  .combat {
    width: 320px;
    height: 240px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
  }
</style>
