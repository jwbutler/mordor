export const playAudio = async (sound: string) => new Audio(sound).play();

export const playLoop = async (sound: string) => {
  const audio = new Audio(sound);
  audio.volume = 0.5;
  audio.loop = true;
  return audio.play();
};
