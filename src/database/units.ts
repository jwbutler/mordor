import { NoobSword } from '../lib/items';
import { koboldSprite } from '../lib/sprites';
import { krawkdawgSprite } from '../lib/sprites';
import { poopGolemSprite } from '../lib/sprites';
import { UnitBuilder } from '../lib/units';
import type { Unit } from '../lib/units';

const createKobold = (): Unit => new UnitBuilder()
  .name('Kobold')
  .level(1)
  .stats({
    strength: 2,
    dexterity: 4,
    intelligence: 3,
    wisdom: 2,
    constitution: 2
  })
  .equipment(NoobSword)
  .sprite(koboldSprite)
  .build();

const createKrawkdawg = (): Unit => new UnitBuilder()
  .name('Krawkdawg')
  .level(1)
  .stats({
    strength: 2,
    dexterity: 4,
    intelligence: 3,
    wisdom: 2,
    constitution: 2
  })
  .equipment(NoobSword)
  .sprite(krawkdawgSprite)
  .build();

const createPoopGolem = (): Unit => new UnitBuilder()
  .name('Poop Golem')
  .level(1)
  .stats({
    strength: 2,
    dexterity: 4,
    intelligence: 3,
    wisdom: 2,
    constitution: 2
  })
  .equipment(NoobSword)
  .sprite(poopGolemSprite)
  .build();
  
const createPlayerUnit = (): Unit => new UnitBuilder()
  .name('Chigz Jupsiz')
  .level(1)
  .stats({
    strength: 8,
    dexterity: 8,
    intelligence: 8,
    wisdom: 8,
    constitution: 8
  })
  .equipment(NoobSword)
  .sprite(koboldSprite) // just a placeholder
  .build();

export {
  createKobold,
  createKrawkdawg,
  createPlayerUnit,
  createPoopGolem
};
