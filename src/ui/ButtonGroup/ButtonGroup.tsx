import { Children, cloneElement } from 'react';

import cn from 'classnames';

import ButtonGroupClasses from './ButtonGroup.module.scss';
import { ButtonGroupProps } from './ButtonGroup.type';

export default function ButtonGroup({
  children,
  className,
  $selected,
  ...props
}: ButtonGroupProps) {
  return (
    <div className={cn(ButtonGroupClasses.root, className)} {...props}>
      {Children.map(children, (child, index) => {
        const buttonStart = index === 0;
        const buttonEnd = index === Children.count(children) - 1;

        return cloneElement(child as React.ReactElement, {
          className: cn({
            [ButtonGroupClasses.selected]: index === $selected,
            [ButtonGroupClasses.start]: buttonStart,
            [ButtonGroupClasses.mid]: !(buttonStart || buttonEnd),
            [ButtonGroupClasses.end]: buttonEnd
          })
        });
      })}
    </div>
  );
}
