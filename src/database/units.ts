import { NoobSword } from '../lib/items';
import { koboldSprite } from '../lib/sprites';
import { UnitBuilder } from '../lib/units';
import type { Unit } from '../lib/units';

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
