const cache: Record<string, ImageData> = {};

const canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 640;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

const createImage = async (src: string): Promise<ImageData> => {
  if (cache[src]) {
    return cache[src];
  }
  const img = document.createElement('img');
  await new Promise(resolve => {
    img.addEventListener('load', resolve);
    img.src = src;
  });
  
  context.drawImage(img, 0, 0);
  return context.getImageData(0, 0, img.width, img.height);
};

export {
  createImage
};
