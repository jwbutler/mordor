import { sleep } from './promises';
import { randInt } from './random';

type TransitionProps = {
  source: HTMLCanvasElement,
  dest: HTMLCanvasElement,
  delay: number, // milliseconds
  frames: number // intermediate frames
};

const transition = async ({ source, dest, delay, frames }: TransitionProps) => {
  const srcContext = source.getContext('2d') as CanvasRenderingContext2D;
  const destContext = dest.getContext('2d') as CanvasRenderingContext2D;
  
  const srcFrames: ImageData[] = [];
  const destFrames: ImageData[] = [];

  for (let i = 0; i < frames; i++) {
    srcFrames.push(srcContext.getImageData(0, 0, source.width, source.height));
    destFrames.push(destContext.getImageData(0, 0, source.width, source.height));
  }

  for (let y = 0; y < source.height; y++) {
    for (let x = 0; x < source.width; x++) {
      const appearFrame = randInt(0, frames - 1);
      for (let i = appearFrame; i < frames; i++) {
        const minIndex = 4 * ((y * source.width) + x);
        for (let index = minIndex; index < minIndex + 4; index++) {
          destFrames[i].data[index] = srcFrames[i].data[index];
        }
      }
    }
  }
  
  for (let i = 0; i < frames; i++) {
    destContext.putImageData(destFrames[i], 0, 0);
    await sleep(delay);
  }
};

export {
  transition
};
