import type React from 'react';

import cn from 'classnames';

import HeroClasses from './Hero.module.scss';

type HeroProps = Pick<
  React.ComponentPropsWithoutRef<'div'>,
  'className' | 'style' | 'children'
> & {
  $image?: React.CSSProperties['backgroundImage'];
  $rounded?: boolean;
} & (
    | { $backdrop?: 'main'; $backdropColor?: undefined }
    | { $backdrop?: 'custom'; $backdropColor: string }
  );

export default function Hero({
  $image,
  $rounded,
  $backdrop,
  $backdropColor,
  className,
  style,
  ...props
}: HeroProps) {
  return (
    <div
      className={cn(
        HeroClasses.root,
        {
          [HeroClasses.rounded]: $rounded,
          [HeroClasses.backdropMain]: $backdrop === 'main',
          [HeroClasses.backdropDefault]: $backdrop === 'custom'
        },
        className
      )}
      style={{
        // @ts-expect-error No need to assert React.CSSProperties here
        '--hero-image': `url('${$image}')`,
        '--hero-backdrop-color': $backdropColor,
        ...style
      }}
      {...props}
    />
  );
}
