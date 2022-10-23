import type React from 'react';

import cn from 'classnames';

interface HeroProps extends React.ComponentPropsWithoutRef<'section'> {
  image?: React.CSSProperties['backgroundImage'];
}

export default function Hero({ image, className, ...props }: HeroProps) {
  const style = {
    '--background-image': `url(${image})`
  } as React.CSSProperties;

  return (
    <section className={cn('pm-c-hero', className)} style={style} {...props} />
  );
}
