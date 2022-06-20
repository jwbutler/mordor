import kobold from '../assets/gen/kobold.png';
import krawkdawg from '../assets/gen/krawkdawg.png';
import poopGolem from '../assets/gen/poopGolem.png';

type Sprite = {
  image: string
};

const koboldSprite: Sprite = { image: kobold };
const krawkdawgSprite: Sprite = { image: krawkdawg };
const poopGolemSprite: Sprite = { image: poopGolem };

export type { Sprite };
export {
  koboldSprite,
  krawkdawgSprite,
  poopGolemSprite
};
