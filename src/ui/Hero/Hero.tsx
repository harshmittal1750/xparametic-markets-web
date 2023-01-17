import type React from 'react';

import cn from 'classnames';

import HeroClasses from './Hero.module.scss';

interface HeroProps
  extends Pick<
    React.ComponentPropsWithoutRef<'div'>,
    'className' | 'style' | 'children'
  > {
  $image?: React.CSSProperties['backgroundImage'];
  $rounded?: boolean;
  $backdrop?: 'main' | 'default';
}

export default function Hero({
  $image,
  $rounded,
  $backdrop,
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
          [HeroClasses.backdropDefault]: !$backdrop || $backdrop === 'default'
        },
        className
      )}
      style={{
        // @ts-expect-error No need to assert React.CSSProperties here
        '--image': `url(${$image})`,
        ...style
      }}
      {...props}
    />
  );
}
