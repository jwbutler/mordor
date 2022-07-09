<script type="ts">
  import town_png from '../images/gen/town.png';
  export let onExit: () => void; 
</script>

<div class="town">
  <map name="town">
    <area
      shape="poly"
      coords="0,0,115,0,132,4,172,33,189,52,203,58,229,88,232,94,292,91,290,153,266,178,227,152,231,106,223,106,226,218,0,354"
      href="#"
      alt=""
    />
  </map>
  <img src={town_png} usemap="#town" alt="" />
  <button on:click={onExit}>
    Exit
  </button>
</div>

<style>
</style>
