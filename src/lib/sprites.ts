import kobold_png from '../images/gen/kobold.png';
import crocdog_png from '../images/gen/crocdog.png';
import mudman_png from '../images/gen/mudman.png';

import crocdog_attack_mp3 from '../sounds/crocdog_attack.mp3';
import crocdog_die_mp3 from '../sounds/crocdog_die.mp3';
import kobold_attack_mp3 from '../sounds/kobold_attack.mp3';
import kobold_die_mp3 from '../sounds/kobold_die.mp3';
import mudman_attack_mp3 from '../sounds/mudman_attack.mp3';
import mudman_die_mp3 from '../sounds/mudman_die.mp3';
import player_attack_mp3 from '../sounds/player_attack.mp3';
import player_die_mp3 from '../sounds/player_die.mp3';

type Sprite = {
  images: {
    standing: string
  },
  sounds: {
    attack: string,
    die: string
  }
};

const playerSprite: Sprite = {
  images: {
    standing: kobold_png // unused
  },
  sounds: {
    attack: player_attack_mp3,
    die: player_die_mp3
  }
};

const koboldSprite: Sprite = {
  images: {
    standing: kobold_png
  },
  sounds: {
    attack: kobold_attack_mp3,
    die: kobold_die_mp3
  }
};

const crocDogSprite: Sprite = {
  images: {
    standing: crocdog_png
  },
  sounds: {
    attack: crocdog_attack_mp3,
    die: crocdog_die_mp3
  }
};
const mudManSprite: Sprite = {
  images: {
    standing: mudman_png
  },
  sounds: {
    attack: mudman_attack_mp3,
    die: mudman_die_mp3
  }
};

export type { Sprite };
export {
  crocDogSprite,
  koboldSprite,
  mudManSprite,
  playerSprite
};
