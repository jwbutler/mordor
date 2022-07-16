<script type="ts">
  export let onExit: () => void; 
</script>

<div class="town">
  hello I am a town
  <button on:click={onExit}>
    Exit
  </button>
</div>

<style>
</style>
