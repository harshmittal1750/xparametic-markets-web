let rgb = [48, 51, 190];

export default function getAverageColor(src: string) {
  const context = document.createElement('canvas').getContext?.('2d', {
    willReadFrequently: true
  });
  const image = new Image();

  if (!context || !src) return rgb;

  image.crossOrigin = 'Anonymous';
  image.width = 64;
  image.height = 64;
  image.src = src;
  context.drawImage(image, 0, 0, 1, 64);

  try {
    rgb = Array.from(
      context.getImageData(0, 0, 1, 1).data.filter((_, index) => index <= 2)
    );
  } catch (error) {
    return rgb;
  }

  return rgb;
}
