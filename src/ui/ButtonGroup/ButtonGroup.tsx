import type React from 'react';
import { Children, cloneElement } from 'react';

import cn from 'classnames';

import ButtonGroupClasses from './ButtonGroup.module.scss';

export default function ButtonGroup({
  children,
  className,
  actived,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  actived: number;
}) {
  return (
    <div className={cn(ButtonGroupClasses.root, className)} {...props}>
      {Children.map(children, (child, index) =>
        cloneElement(child as React.ReactElement, {
          className: cn(ButtonGroupClasses.buttons, {
            [ButtonGroupClasses.actived]: index === actived
          })
        })
      )}
    </div>
  );
}
