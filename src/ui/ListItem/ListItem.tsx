import React, { createElement } from 'react';

import cn from 'classnames';

import listItemClasses from './ListItem.module.scss';

type ListItemProps = (
  | ({
      onClick?: undefined;
    } & React.ComponentPropsWithoutRef<'li'>)
  | ({
      onClick?: React.ComponentPropsWithoutRef<'button'>['onClick'];
    } & React.ComponentPropsWithoutRef<'button'>)
) & {
  $actived?: boolean;
};

export default function ListItem({
  className,
  $actived,
  ...props
}: ListItemProps) {
  const el = props.onClick ? 'button' : 'li';
  const isButton = el === 'button';

  return createElement(el, {
    className: cn(
      listItemClasses.root,
      {
        [listItemClasses.button]: isButton,
        [listItemClasses.buttonActive]: isButton && $actived
      },
      className
    ),
    ...props
  });
}
