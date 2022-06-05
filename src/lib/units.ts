import { getMaxLife, getMaxMana } from './stats';
import type { Equipment, EquipmentSlot } from './items';
import type { Sprite } from './sprites';
import type { Stats } from './stats';

type Unit = {
  name: string,
  level: number,
  stats: Stats,
  life: number,
  mana: number,
  equipment: Partial<Record<EquipmentSlot, Equipment>>,
  sprite: Sprite
};

class UnitBuilder {
  private readonly unit: Partial<Unit>;
  
  constructor() {
    this.unit = {};
  }
  
  name = (name: string): UnitBuilder => {
    this.unit.name = name;
    return this;
  };
  
  level = (level: number): UnitBuilder => {
    this.unit.level = level;
    return this;
  };
  
  stats = (stats: Stats): UnitBuilder => {
    this.unit.stats = stats;
    return this;
  };
  
  life = (life: number): UnitBuilder => {
    this.unit.life = life;
    return this;
  };
  
  mana = (mana: number): UnitBuilder => {
    this.unit.mana = mana;
    return this;
  };
  
  equipment = (...equipmentList: Equipment[]): UnitBuilder => {
    const slotToEquipment: Partial<Record<EquipmentSlot, Equipment>> = {};
    for (const equipment of equipmentList) {
      slotToEquipment[equipment.slot] = equipment;
    }
    this.unit.equipment = slotToEquipment;
    return this;
  };
  
  sprite = (sprite: Sprite): UnitBuilder => {
    this.unit.sprite = sprite;
    return this;
  };
  
  build = (): Unit => {
    const unit = {
      ...this.unit,
      // TODO I don't love this hack
      life: getMaxLife(this.unit as Unit),
      mana: getMaxMana(this.unit as Unit),
    };
    return unit as Unit;
  };
}

export type { Unit };
export { UnitBuilder };
