<script type="ts">
  import type { CombatHandler } from '../classes/CombatHandler';
  import { state } from '../stores/state';

  export let handler: CombatHandler;
</script>

<div class="combat">
  <div>{handler.getAttacker().name}</div>
  <div>{handler.getDefender().name}</div>
  <button on:click={async () => {
    if ($state.enableInput) {
      $state.enableInput = false;
      await handler.playTurnPair($state);
      $state.enableInput = true;
    }
  }}>
    Fight!
  </button>
</div>

<style>
  .combat {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
  }
  
  .combat > * {
    width: 40%;
    text-align: center;
  }
</style>
