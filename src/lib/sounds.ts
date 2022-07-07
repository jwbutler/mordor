import footstepSrc from '../assets/footstep.mp3';
import hitSrc from '../assets/hit.mp3';

type SoundEnum = 'footstep' | 'hit';
export const playAudio = (sound: SoundEnum) => ({
  'footstep': () => new Audio(footstepSrc).play(),
  'hit': () => new Audio(hitSrc).play()
}[sound])();