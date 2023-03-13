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
  $backdrop?: 'main' | (string & {});
}

function isMain(params: HeroProps['$backdrop']): params is 'main' {
  return params === 'main';
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
          [HeroClasses.backdropMain]: isMain($backdrop),
          [HeroClasses.backdropCustom]: !isMain($backdrop)
        },
        className
      )}
      style={{
        // @ts-expect-error No need to assert React.CSSProperties here
        '--hero-image': `url('${$image}')`,
        ...(!isMain($backdrop) && {
          '--hero-backdrop-color': $backdrop
        }),
        ...style
      }}
      {...props}
    />
  );
}
