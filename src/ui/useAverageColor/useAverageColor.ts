import { useEffect, useState } from 'react';

export default function useAverageColor(
  ref: React.RefObject<HTMLImageElement>
) {
  const [RGB, setRGB] = useState({
    red: 48,
    green: 51,
    blue: 190
  });
  const [context] = useState(() =>
    document.createElement('canvas').getContext?.('2d')
  );

  useEffect(() => {
    const { current: node } = ref;

    async function buildImage() {
      if (node) {
        node.crossOrigin = 'Anonymous';

        try {
          context?.drawImage(node, 0, 0, 1, 64);
          const imageData = context?.getImageData(0, 0, 1, 1);

          if (imageData?.data) {
            setRGB({
              red: imageData?.data[0],
              green: imageData?.data[1],
              blue: imageData?.data[2]
            });
          }
        } catch (error) {
          setRGB(prevRGB => prevRGB);
        }
      }
    }

    node?.addEventListener('load', buildImage);

    return () => node?.removeEventListener('load', buildImage);
  }, [context, ref]);

  return RGB;
}
