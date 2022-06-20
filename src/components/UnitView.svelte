<script type="ts">
  import {equipmentSlotToString, equipmentSlotValues} from '../lib/items';
  import type { Stats } from '../lib/stats';
  import { statValues } from '../lib/stats';
  import type { Unit } from '../lib/units';
  import { getModifiedStats } from '../lib/stats';
  import { titleCase } from '../lib/strings';
  import ResourceMeter from "./ResourceMeter.svelte";

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
  <tr>
    <td>Experience</td>
    <td>
      <div class="meter">
        <ResourceMeter
          type="experience"
          current={unit.experience}
          max={unit.experienceToNextLevel}
        />
      </div>
      <div>{unit.experience} / {unit.experienceToNextLevel}</div>
    </td>
  </tr>
  <tr>
    <td>Life</td>
    <td>
      <div class="meter">
        <ResourceMeter
          type="life"
          current={unit.life}
          max={unit.maxLife}
        />
      </div>
      <div>{unit.life} / {unit.maxLife}</div>
    </td>
  </tr>
  <tr>
    <td>Mana</td>
    <td>
      <div class="meter">
        <ResourceMeter
          type="mana"
          current={unit.mana}
          max={unit.maxMana}
        />
      </div>
      <div>{unit.mana} / {unit.maxMana}</div>
    </td>
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
    border: 1px solid black;
    background-color: #ffffff;
  }
  
  td {
    border: 1px solid black;
    padding: 5px;
    text-align: center;
  }
  
  td:first-child {
    width: 40%;
  }
  
  .meter {
    width: 75%;
    margin: 0 auto;
  }
  
</style>
