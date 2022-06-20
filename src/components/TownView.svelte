<script type="ts">
  export let onExit: () => void; 
</script>

<div class="town">
  hello i am a town
  
  <button on:click={onExit}>
    Bye
  </button>
</div>

<style>
  button {
    color: red;
  }
</style>
