import type { Equipment, EquipmentSlot } from './items';
import type { Sprite } from './sprites';
import type { Stats } from './stats';

type Unit = {
  name: string,
  level: number,
  stats: Stats,
  equipment: Partial<Record<EquipmentSlot, Equipment>>,
  sprite: Sprite
};

export type { Unit };
