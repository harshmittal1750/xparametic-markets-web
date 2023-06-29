import { forwardRef, useCallback } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import type { AvatarProps } from 'ui/Avatar';
import { getAvatarClasses } from 'ui/Avatar';
import Skeleton from 'ui/Skeleton';
import useImage from 'ui/useImage';

import { Logos } from 'components';

import imageClasses from './Image.module.scss';

export type ImageProps = AvatarProps;

function Div(props: React.PropsWithChildren<{ className?: string }>) {
  return (
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
      {...props}
    />
  );
}

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { alt, className, ...props },
  ref
) {
  const [state, { ref: imageRef, ...imageProps }] = useImage();

  return (
    <div className={cn(imageClasses.root, getAvatarClasses(props), className)}>
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
        className={cn(imageClasses.element, {
          [imageClasses.elementHide]: state !== 'ok'
        })}
        {...imageProps}
        {...props}
      />
      <AnimatePresence>
        {state === 'load' && (
          <Div>
            <Skeleton className={imageClasses.skeleton} />
          </Div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {state === 'error' && (
          <Div className={imageClasses.fallback}>
            <Logos
              size="md"
              standard="mono"
              className={imageClasses.fallbackElement}
            />
          </Div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Image;
