<script type="ts">
  import {equipmentSlotToString, equipmentSlotValues} from '../lib/items';
  import type { Stats } from '../lib/stats';
  import { statValues } from '../lib/stats';
  import type { Unit } from '../lib/units';
  import { getModifiedStats } from '../lib/stats';
  import { titleCase } from '../lib/strings';

  export let unit: Unit;
  let modifiedStats: Stats;
  modifiedStats = getModifiedStats(unit);
  
</script>

<table class="unit">
  <tr>
    <td>Name</td>
    <td>{unit.name}</td>
  </tr>
  <tr>
    <td>Level</td>
    <td>{unit.level}</td>
  </tr>
  {#each statValues as stat}
    <tr>
      <td>{titleCase(stat)}</td>
      <td>{modifiedStats[stat]} ({unit.stats[stat]})</td>
    </tr>
  {/each}
  {#each equipmentSlotValues as slot}
    <tr>
      <td>{equipmentSlotToString(slot)}</td>
      <td>{unit.equipment[slot]?.name || ''}</td>
    </tr>
  {/each} 
</table>

<style>
  .unit {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
  }
  
  td {
    border: 1px solid black;
    padding: 5px;
  }
  
  td:first-child {
    width: 40%;
  }
  
</style>
