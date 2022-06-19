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
    <button on:click={attack}>Attack</button>
  {:else}
    <button disabled>Attack</button>
  {/if}
  <button disabled>Item</button>
  <button disabled>Run</button>
</div>

<style>
  .combat {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 20px;
  }
  
  button {
    text-align: center;
    border: 1px solid #808080;
    border-radius: 10px;
    background-color: #f0f0f0;
    padding: 10px;
    width: 35%;
  }
  
  button:disabled {
    background-color: #e0e0e0;
  }
  
  @media (max-width: 767px) {
    .combat {
      border-radius: 0;
      justify-content: space-between;
    }
    
    button {
      width: 90%;
      height: 25%;
    }
  }
</style>
