import React from 'react';

import cn from 'classnames';

import listItemClasses from './ListItem.module.scss';

type ListItemProps = Pick<
  React.ComponentPropsWithoutRef<'li'>,
  'className' | 'children'
> & {
  $actived?: boolean;
  ButtonProps?: React.ComponentPropsWithoutRef<'button'>;
};

export default function ListItem({
  className,
  children,
  ButtonProps,
  $actived,
  ...props
}: ListItemProps) {
  const {
    className: buttonClassName,
    onClick,
    ...buttonProps
  } = ButtonProps || {};

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
            buttonClassName
          )}
          onClick={onClick}
          {...buttonProps}
        >
          {children}
        </button>
      ) : (
        children
      )}
    </li>
  );
}
