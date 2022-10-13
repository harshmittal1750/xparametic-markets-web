import cn from 'classnames';

import IconClasses from './Icon.module.scss';
import type { IconProps } from './Icon.type';

export default function Icon({ accessible, size = 'md', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      className={cn(IconClasses.root, {
        [IconClasses.sm]: size === 'sm',
        [IconClasses.md]: size === 'md',
        [IconClasses.lg]: size === 'lg'
      })}
      {...(!accessible && {
        'aria-hidden': 'true'
      })}
      {...props}
    />
  );
}
Icon.displayName = 'Icon';
