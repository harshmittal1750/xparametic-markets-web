import React from 'react';

import cn from 'classnames';

import listItemClasses from './ListItem.module.scss';

type ListItemProps = Pick<
  React.ComponentPropsWithoutRef<'li'>,
  'className' | 'children'
> & {
  $actived?: boolean;
} & (
    | {
        onClick?: undefined;
        name?: undefined;
        ButtonProps?: undefined;
      }
    | {
        onClick?: React.ComponentPropsWithoutRef<'button'>['onClick'];
        name?: React.ComponentPropsWithoutRef<'button'>['name'];
        ButtonProps?: React.ComponentPropsWithoutRef<'button'>;
      }
  );

export default function ListItem({
  className,
  children,
  ButtonProps,
  name,
  onClick,
  $actived,
  ...props
}: ListItemProps) {
  return (
    <li
      className={cn(
        {
          [listItemClasses.root]: !onClick
        },
        className
      )}
      {...props}
    >
      {onClick ? (
        <button
          type="button"
          className={cn(
            listItemClasses.root,
            listItemClasses.button,
            {
              [listItemClasses.buttonActive]: $actived
            },
            ButtonProps?.className
          )}
          onClick={onClick}
          name={name}
          {...ButtonProps}
        >
          {children}
        </button>
      ) : (
        children
      )}
    </li>
  );
}
