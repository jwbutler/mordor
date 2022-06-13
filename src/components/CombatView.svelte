<script type="ts">
  import type { CombatHandler } from '../classes/CombatHandler';
  import { state } from '../stores/state';

  export let handler: CombatHandler;
  
  const attack = async () => {
    if ($state.enableInput) {
      $state.enableInput = false;
      await handler.playTurnPair($state);
      $state.enableInput = true;
    }
  };
</script>

<div class="combat">
  {#if $state.enableInput}
    <button on:click={attack}>
      Attack
    </button>
    <button disabled>Item</button>
    <button disabled>Run</button>
  {/if}
</div>

<style>
  .combat {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 40px;
  }
  
  button {
    width: 80%;
    text-align: center;
    padding: 20px;
    border: 1px solid #808080;
    border-radius: 10px;
  }
  
  @media (max-width: 767px) {
    .combat {
      border-radius: 0;
    }
  }
</style>
