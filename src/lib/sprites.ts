import kobold from '../assets/gen/kobold.png';
import crocdog from '../assets/gen/crocdog.png';
import mudman from '../assets/gen/mudman.png';

type Sprite = {
  image: string
};

const koboldSprite: Sprite = { image: kobold };
const crocDogSprite: Sprite = { image: crocdog };
const mudManSprite: Sprite = { image: mudman };

export type { Sprite };
export {
  koboldSprite,
  crocDogSprite,
  mudManSprite
};
