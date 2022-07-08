import { NoobSword } from '../lib/items';
import { koboldSprite } from '../lib/sprites';
import { crocDogSprite } from '../lib/sprites';
import { mudManSprite } from '../lib/sprites';
import { playerSprite } from '../lib/sprites';
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

const createCrocDog = (): Unit => new UnitBuilder()
  .name('Croc Dog')
  .level(1)
  .stats({
    strength: 4,
    dexterity: 6,
    intelligence: 3,
    wisdom: 2,
    constitution: 3
  })
  .equipment(NoobSword)
  .sprite(crocDogSprite)
  .build();

const createMudMan = (): Unit => new UnitBuilder()
  .name('Mud Man')
  .level(1)
  .stats({
    strength: 6,
    dexterity: 4,
    intelligence: 3,
    wisdom: 2,
    constitution: 4
  })
  .equipment(NoobSword)
  .sprite(mudManSprite)
  .build();
  
const createPlayerUnit = (): Unit => new UnitBuilder()
  .name('Player Guy')
  .level(1)
  .stats({
    strength: 8,
    dexterity: 8,
    intelligence: 8,
    wisdom: 8,
    constitution: 8
  })
  .equipment(NoobSword)
  .sprite(playerSprite) // just a placeholder
  .build();

export {
  createKobold,
  createCrocDog,
  createPlayerUnit,
  createMudMan
};
