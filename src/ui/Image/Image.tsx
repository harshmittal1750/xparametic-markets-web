import { forwardRef, useCallback } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Skeleton from 'ui/Skeleton';
import useImage from 'ui/useImage';

import imageClasses from './Image.module.scss';

export type ImageProps = Pick<
  React.ComponentPropsWithRef<'img'>,
  'src' | 'alt' | 'className' | 'ref'
> & {
  $size?: 'x2s' | 'xs' | 'sm' | 'md' | 'lg';
  $radius?: 'sm' | 'md' | 'lg' | 'full';
};

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { $size, $radius, className, alt, ...props },
  ref
) {
  const [state, { ref: imageRef, ...imageProps }] = useImage();

  return (
    <div
      className={cn(
        imageClasses.root,
        {
          [imageClasses.radiusSm]: $radius === 'sm',
          [imageClasses.radiusMd]: $radius === 'md',
          [imageClasses.radiusLg]: $radius === 'lg',
          [imageClasses.radiusFull]: $radius === 'full',
          [imageClasses.sizeX2s]: $size === 'x2s',
          [imageClasses.sizeSm]: $size === 'sm',
          [imageClasses.sizeMd]: $size === 'md',
          [imageClasses.sizeLg]: $size === 'lg'
        },
        className
      )}
    >
      <img
        alt={alt}
        ref={useCallback(
          (image: HTMLImageElement | null) => {
            if (ref != null) {
              if (typeof ref === 'function') ref(image);
              if (typeof ref === 'object' && 'current' in ref)
                // eslint-disable-next-line no-param-reassign
                ref.current = image;
            }
            if (typeof imageRef === 'function') imageRef?.(image);
          },
          [imageRef, ref]
        )}
        className={cn(imageClasses.image, {
          [imageClasses.imageHide]: state === 'load'
        })}
        {...imageProps}
        {...props}
      />
      <AnimatePresence>
        {state === 'load' && (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
          >
            <Skeleton
              $radius="full"
              style={{
                position: 'absolute',
                top: 0,
                height: '100%'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Image;
