import { memo } from 'react';

import cn from 'classnames';

import IconClasses from './Icon.module.scss';
import type { IconProps, Icons } from './Icon.type';
import { ICONS } from './Icon.utils';

function IconRoot({ accessible, size = 'md', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      className={cn(IconClasses.root, {
        [IconClasses.sm]: size === 'sm',
        [IconClasses.md]: size === 'md'
      })}
      {...(!accessible && {
        'aria-hidden': 'true'
      })}
      {...props}
    />
  );
}
export function createIcon(name: string, paths: string | Array<string>) {
  function Icon(props: IconProps) {
    const { accessible } = props;

    return (
      <IconRoot {...props}>
        {accessible && <title>{name}</title>}
        {typeof paths === 'string' ? <path d={paths} /> : paths}
      </IconRoot>
    );
  }

  Icon.displayName = `Icon${name}`;

  return memo(Icon, Object.is);
}

IconRoot.displayName = 'Icon';

export default Object.assign(
  IconRoot,
  Object.keys(ICONS).reduce(
    (icons, iconName) => ({
      ...icons,
      [iconName]: createIcon(iconName, ICONS[iconName])
    }),
    {} as Record<Icons, typeof IconRoot>
  )
);
