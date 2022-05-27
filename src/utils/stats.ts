import { statValues } from '../types/stats';
import type { Stats } from '../types/stats';
import type { Unit } from '../types/units';

const strengthToDamage = 1;
const dexterityToHitChance = 0.01;
const constitutionToLife = 10;
const wisdomToMana = 10;

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

const getAttackDamage = (attacker: Unit): number => {
  let damage = 0;
  damage += (attacker.stats.strength * strengthToDamage);
  for (const equipment of Object.values(attacker.equipment)) {
    damage += (equipment.stats.strength * strengthToDamage);
    damage += equipment.damage;
  }
  return damage;
};

const getMaxLife = (unit: Unit): number => {
  let life = 0;
  life += (unit.stats.constitution * constitutionToLife);
  for (const equipment of Object.values(unit.equipment)) {
    life += (equipment.stats.constitution * constitutionToLife);
    life += equipment.life;
  }
  return life;
};

const getMaxMana = (unit: Unit): number => {
  let mana = 0;
  mana += (unit.stats.wisdom * wisdomToMana);
  for (const equipment of Object.values(unit.equipment)) {
    mana += (equipment.stats.wisdom * wisdomToMana);
    mana += equipment.mana;
  }
  return mana;
};

const getMitigation = (unit: Unit): number => {
  let mitigation = 0;
  for (const equipment of Object.values(unit.equipment)) {
    mitigation += equipment.mitigation;
  }
  return mitigation;
};

const getDodgeChance = (unit: Unit): number => {
  let dodgeChance = 0;
  for (const equipment of Object.values(unit.equipment)) {
    dodgeChance += equipment.dodgeChance;
  }
  return dodgeChance;
};

const getMitigatedDamage = (defender: Unit, incomingDamage: number): number =>
  Math.round(incomingDamage * (1 - getMitigation(defender)));

const getHitChance = (unit: Unit): number => {
  let hitChance = 0.5;
  hitChance += (unit.stats.dexterity * dexterityToHitChance);
  for (const equipment of Object.values(unit.equipment)) {
    hitChance += (equipment.stats.dexterity * dexterityToHitChance);
  }
  return hitChance;
};

export {
  getAttackDamage,
  getDodgeChance,
  getHitChance,
  getMaxLife,
  getMaxMana,
  getMitigatedDamage,
  getModifiedStats,
  subtractStats
};
