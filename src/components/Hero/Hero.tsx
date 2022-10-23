import type React from 'react';

import cn from 'classnames';

interface HeroProps extends React.ComponentPropsWithoutRef<'section'> {
  image?: React.CSSProperties['backgroundImage'];
}

export default function Hero({ image, ...props }: HeroProps) {
  return (
    <section
      className={cn('pm-c-hero')}
      style={
        {
          '--background-image': `url(${image})`
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
