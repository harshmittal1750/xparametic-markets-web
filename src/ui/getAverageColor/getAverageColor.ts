export default function getAverageColor(src: string) {
  const context = document.createElement('canvas').getContext?.('2d', {
    willReadFrequently: true
  });
  const image = new Image();

  image.crossOrigin = 'Anonymous';
  image.width = 64;
  image.height = 64;
  image.src = src;
  context?.drawImage(image, 0, 0, 1, 64);

  const imageData = context?.getImageData(0, 0, 1, 1);

  if (imageData?.data)
    return Array.from(imageData?.data.filter((_, index) => index <= 2));

  return [48, 51, 190];
}
