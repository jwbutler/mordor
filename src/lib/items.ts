import { titleCase } from './strings';
import { zeroStats } from './stats';
import type { Stats } from './stats';

type InventoryItem = {
  name: string
};

type Equipment = InventoryItem & {
  slot: EquipmentSlot,
  stats: Stats,
  damage: number,
  /**
   * Number from 0 to 1 (ratio of damage mitigated)
   */
  mitigation: number,
  /**
   * Number from 0 to 1 (chance to dodge)
   */
  dodgeChance: number,
  life: 0,
  mana: 0
};

type EquipmentSlot = 'mainHand' | 'offHand' | 'head' | 'body' | 'hands' | 'legs' | 'feet';
const equipmentSlotValues: EquipmentSlot[] = ['mainHand', 'offHand', 'head', 'body', 'hands', 'legs', 'feet'];

const equipmentSlotToString = (slot: EquipmentSlot): string => {
  switch (slot) {
    case 'mainHand': return 'Main Hand';
    case 'offHand':  return 'Off Hand';
    default:
      return titleCase(slot);
  }
};

const NoobSword: Equipment = {
  name: 'Noob Sword',
  slot: 'mainHand',
  stats: zeroStats,
  damage: 2,
  mitigation: 0,
  dodgeChance: 0,
  life: 0,
  mana: 0
};

export type {
  Equipment,
  EquipmentSlot,
  InventoryItem
};

export {
  equipmentSlotValues,
  NoobSword,
  equipmentSlotToString
};
