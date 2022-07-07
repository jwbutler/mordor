import _canvas from 'canvas';
import rimraf from 'rimraf';
const { createCanvas, ImageData, loadImage } = _canvas;
import { mkdirSync, readdirSync, writeFileSync } from 'fs';
import imageMin from 'imagemin';
import pngquantPlugin from 'imagemin-pngquant';
import optipngPlugin from 'imagemin-optipng';

type RGBA = [number, number, number, number];

type Pair<T> = [T, T]; 

const matches = (a: RGBA, b: RGBA) => JSON.stringify(a) === JSON.stringify(b);

const replaceColors = (imageData: ImageData, paletteSwaps: Pair<RGBA>[]): ImageData => {
  const array = new Uint8ClampedArray(imageData.data.length);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, a] = imageData.data.slice(i, i + 4);
    array[i] = r;
    array[i + 1] = g;
    array[i + 2] = b;
    array[i + 3] = a;

    for (const [src, dest] of paletteSwaps) {
      if (matches(src, [r, g, b, a])) {
        array[i] = dest[0];
        array[i + 1] = dest[1];
        array[i + 2] = dest[2];
        array[i + 3] = dest[3];
      }
    }
  }

  return new ImageData(array, imageData.width, imageData.height);
};

const bmpDir = 'images';
const tmpDir = 'tmp/images';
const outDir = 'src/assets/gen';

const WHITE: RGBA = [255, 255, 255, 255];
const LIGHT_GRAY: RGBA = [192, 192, 192, 255];
const LIGHTER_GRAY: RGBA = [224, 224, 224, 255];
const DARK_GRAY: RGBA = [128, 128, 128, 255];
const DARKER_GRAY: RGBA = [64, 64, 64, 255];
const RED: RGBA = [255, 0, 0, 255];
const YELLOW: RGBA = [255, 255, 0, 255];
const DARK_GREEN: RGBA = [0, 128, 0, 255];
const BLUE: RGBA = [0, 0, 255, 255];
const BROWN: RGBA = [128, 64, 0, 255];
const DARK_BROWN: RGBA = [64, 32, 0, 255];
const TRANSPARENT: RGBA = [0, 0, 0, 0];

const getPaletteSwaps = (filename: string): Pair<RGBA>[] => {
  if (filename.match(/hall/g)) {
    return [
      [WHITE, TRANSPARENT],
      [RED, DARK_GRAY]
    ];
  } else if (filename.match(/wall/g)) {
    return [
      [WHITE, TRANSPARENT],
      [RED, DARK_GRAY]
    ];
  } else if (filename.match(/floor/g)) {
    return [
      [WHITE, TRANSPARENT],
      [YELLOW, BROWN],
      [BLUE, BROWN],
    ];
  } else {
    return [
      [WHITE, TRANSPARENT]
    ];
  }
};

const main = async () => {
  rimraf.sync(tmpDir);
  rimraf.sync(outDir);
  mkdirSync(tmpDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });

  for (const filename of readdirSync(bmpDir)) {
    const image = await loadImage(`${bmpDir}/${filename}`);
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const data = context.getImageData(0, 0, image.width, image.height);
    const swapped = replaceColors(data, getPaletteSwaps(filename));
    context.putImageData(swapped, 0, 0);
    const outputBuffer = canvas.toBuffer();
    const outputFilename = `${tmpDir}/${filename.replace('bmp', 'png').replaceAll(/ /g, '_')}`;
    writeFileSync(outputFilename, outputBuffer);
    console.log(outputFilename);
  }

  await imageMin([`${tmpDir}/*`], {
    destination: outDir,
    plugins: [optipngPlugin(), pngquantPlugin()]
  });
  
  for (const filename of readdirSync(outDir)) {
    console.log(`${outDir}/${filename}`);
  }
};

main().then(() => {});
