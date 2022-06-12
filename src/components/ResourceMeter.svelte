<script type="ts">
  type ResourceType = 'life' | 'mana' | 'experience';
  export let type: ResourceType;
  export let current: number;
  export let max: number;
  
  let percent: number;
  let level: string;
  $: {
    percent = 100 * current / max;
    level = (percent >= 0.75) ? 'high'
    : (percent >= 0.50) ? 'medium'
    : (percent >= 0.25) ? 'low'
    : 'critical';
  }
</script>

<div class="meter">
  <div class="current {type} {level}" style="width: {percent}%;">
  </div>
</div>

<style>
  .meter {
    height: 20px;
    position: relative;
    background-color: #e0e0e0;
    border: 1px solid black;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .current {
    height: 100%;
    position: absolute;
    outline: 1px solid black;
  }
  
  .life.high {
    background-color: #00ff00;
  }
  
  .life.medium {
    background-color: #ffff00;
  }
  
  .life.low {
    background-color: #ff8000;
  }
  
  .life.critical {
    background-color: #ff0000;
  }
  
  .mana {
    background-color: #0000ff;
  }
  
  .experience {
    background-color: #ffc000;
  }
</style>
