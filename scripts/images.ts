import _canvas from 'canvas';
import rimraf from 'rimraf';
const { createCanvas, ImageData, loadImage } = _canvas;
import { mkdirSync, readdirSync, writeFileSync } from 'fs';
import imageMin from 'imagemin';
import imageminPngQuant from 'imagemin-pngquant';

const removeWhite = (imageData: ImageData): ImageData => {
  const array = new Uint8ClampedArray(imageData.data.length);

  for (let i = 0; i < imageData.data.length; i += 4) {
    // @ts-ignore
    const [r, g, b, a] = imageData.data.slice(i, i + 4);
    array[i] = r;
    array[i + 1] = g;
    array[i + 2] = b;
    array[i + 3] = a;

    if (r === 255 && g === 255 && b === 255 && a === 255) {
      array[i + 3] = 0;
    }
  }

  return new ImageData(array, imageData.width, imageData.height);
};

const bmpDir = 'bmp';
const tmpDir = 'tmp/bmp';
const outDir = 'src/assets/gen';

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
    const withTransparency = removeWhite(data);
    context.putImageData(withTransparency, 0, 0);
    const outputBuffer = canvas.toBuffer();
    const outputFilename = `${tmpDir}/${filename.replace('bmp', 'png').replaceAll(' ', '_')}`; 
    writeFileSync(outputFilename, outputBuffer);
    console.log(outputFilename);
  }

  await imageMin([`${tmpDir}/*`], {
    destination: outDir,
    plugins: [imageminPngQuant()]
  });
  
  for (const filename of readdirSync(outDir)) {
    console.log(`${outDir}/${filename}`);
  }
};

main().then(() => {});
