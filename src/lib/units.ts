import { getExperienceToNextLevel, getMaxLife, getMaxMana } from './stats';
import type { Equipment, EquipmentSlot } from './items';
import type { Sprite } from './sprites';
import type { Stats } from './stats';

type Unit = {
  name: string,
  level: number,
  stats: Stats,
  life: number,
  maxLife: number,
  mana: number,
  maxMana: number,
  experience: number,
  experienceToNextLevel: number,
  equipment: Partial<Record<EquipmentSlot, Equipment>>,
  sprite: Sprite
};

const levelUp = (unit: Unit) => {
  unit.level++;
  unit.experience = 0;
  unit.experienceToNextLevel = getExperienceToNextLevel(unit.level);
  unit.stats.strength++;
  unit.stats.dexterity++;
  unit.stats.constitution++;
  unit.stats.intelligence++;
  unit.stats.wisdom++;
  unit.maxLife = getMaxLife(unit);
  unit.maxMana = getMaxMana(unit);
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
      life: 1,
      mana: 1,
      maxLife: 1,
      maxMana: 1,
      experience: 0,
      experienceToNextLevel: getExperienceToNextLevel(this.unit.level as number)
    } as Unit;
    
    unit.maxLife = getMaxLife(unit);
    unit.maxMana = getMaxMana(unit);
    unit.life = unit.maxLife;
    unit.mana = unit.maxMana;
    
    return unit as Unit;
  };
}

export type { Unit };
export {
  UnitBuilder,
  levelUp
};
