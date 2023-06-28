function getImage(src: string, options: Record<'width' | 'height', number>) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.crossOrigin = 'Anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
    image.width = options.width;
    image.height = options.height;
  });
}

/**
 * Returns the average color from a given image.
 * @param {string} src Source link image.
 * @returns {Promise<string>} RGB color string-like `RRR GGG BBB`
 */
export default async function getAverageColor(src: string): Promise<string> {
  const context = document.createElement('canvas').getContext?.('2d', {
    willReadFrequently: true
  });

  if (!context || !src) return '';

  try {
    const image = await getImage(src, {
      width: 64,
      height: 64
    });

    context.drawImage(image, 0, 0, 1, 64);

    return context
      .getImageData(0, 0, 1, 1)
      .data.filter((_, index) => index <= 2)
      .join(' ');
  } catch (error) {
    return '';
  }
}
