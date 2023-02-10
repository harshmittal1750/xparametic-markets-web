import { useEffect, useState } from 'react';

export default function useAverageColor(
  ref: React.RefObject<HTMLImageElement>
) {
  const [RGB, setRGB] = useState({
    red: 0,
    green: 0,
    blue: 0
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
          context?.drawImage(node, 0, 0, 1, 1);
          const imageData = context?.getImageData(0, 0, 1, 1);

          if (imageData?.data) {
            setRGB({
              red: imageData?.data[0],
              green: imageData?.data[1],
              blue: imageData?.data[2]
            });
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          if (error instanceof Error) console.error(new Error(error.message));
        }
      }
    }

    node?.addEventListener('load', buildImage);

    return () => node?.removeEventListener('load', buildImage);
  }, [context, ref]);

  return RGB;
}
