import { NoobSword } from '../types/items';
import { koboldSprite } from '../types/sprites';
import { UnitBuilder } from '../types/units';
import type { Unit } from '../types/units';

const createKobold = (): Unit => new UnitBuilder()
  .name('Kobold')
  .level(1)
  .stats({
    strength: 3,
    dexterity: 5,
    intelligence: 3,
    wisdom: 2,
    constitution: 2
  })
  .equipment(NoobSword)
  .sprite(koboldSprite)
  .build();
  
const createPlayerUnit = (): Unit => new UnitBuilder()
  .name('Chigz Jupsiz')
  .level(1)
  .stats({
    strength: 5,
    dexterity: 5,
    intelligence: 5,
    wisdom: 5,
    constitution: 5
  })
  .equipment(NoobSword)
  .sprite(koboldSprite) // just a placeholder
  .build();

export { createKobold, createPlayerUnit };
