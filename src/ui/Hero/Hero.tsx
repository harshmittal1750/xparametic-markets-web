import cn from 'classnames';

import HeroClasses from './Hero.module.scss';
import { HeroProps } from './Hero.type';

export default function Hero({ $imageUrl, className, ...props }: HeroProps) {
  const style = {
    '--background-image': `url(${$imageUrl})`
  } as React.CSSProperties;

  return (
    <section
      className={cn(HeroClasses.root, className)}
      style={style}
      {...props}
    />
  );
}
