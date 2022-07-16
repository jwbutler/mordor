<script type="ts">
  import type { Player } from '../lib/player';
  import type { Stats } from '../lib/stats';
  import type { Unit } from '../lib/units';
  import { getModifiedStats } from '../lib/stats';
  import ResourceMeter from "./ResourceMeter.svelte";

  export let player: Player;
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
  <tr>
    <td>Gold</td>
    <td>{player.gold}</td>
  </tr>
</table>

<style>
  .unit {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
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
