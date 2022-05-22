import { statValues } from '../types/stats';
import type { Stats } from '../types/stats';
import type { Unit } from '../types/units';

const strengthToDamage = 1;

const addStats = (first: Stats, second: Stats): Stats => {
  const combined: Partial<Stats> = {};
  for (const stat of statValues) {
    combined[stat] = first[stat] + second[stat];
  }
  return combined as Stats;
};

const subtractStats = (first: Stats, second: Stats): Stats => {
  const combined: Partial<Stats> = {};
  for (const stat of statValues) {
    combined[stat] = first[stat] - second[stat];
  }
  return combined as Stats;
};

const getModifiedStats = (unit: Unit): Stats => {
  let stats = { ...unit.stats };
  for (const equipment of Object.values(unit.equipment)) {
    stats = addStats(stats, equipment.stats);
  }
  return stats;
};

const getAttackDamage = (unit: Unit): number => {
  let damage = 0;
  damage += (unit.stats.strength * strengthToDamage);
  for (const equipment of Object.values(unit.equipment)) {
    damage += (equipment.stats.strength * strengthToDamage);
    damage += equipment.damage;
  }
  return damage;
};

export {
  getAttackDamage,
  getModifiedStats,
  subtractStats
};
