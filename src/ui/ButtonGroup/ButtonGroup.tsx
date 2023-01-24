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
      {Children.map(children, (_child, index) => {
        const child = _child as React.ReactElement;
        const initial = index === 0;
        const last = index === Children.count(children) - 1;

        return cloneElement(child, {
          className: cn(
            ButtonGroupClasses.buttons,
            {
              [ButtonGroupClasses.actived]: index === actived,
              [ButtonGroupClasses.start]: initial,
              [ButtonGroupClasses.mid]: !(initial || last),
              [ButtonGroupClasses.end]: last
            },
            child.props.className
          )
        });
      })}
    </div>
  );
}
