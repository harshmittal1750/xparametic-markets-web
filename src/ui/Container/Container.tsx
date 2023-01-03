import { createElement } from 'react';

import cn from 'classnames';

import ContainerClasses from './Container.module.scss';

export interface ContainerProps<E extends keyof JSX.IntrinsicElements>
  extends Pick<React.ComponentPropsWithRef<'div'>, 'children' | 'className'> {
  $enableGutters?: boolean;
  $as?: E;
}

export default function Container<E extends keyof JSX.IntrinsicElements>({
  className,
  $enableGutters,
  $as,
  ...props
}: ContainerProps<E>) {
  return createElement($as || 'div', {
    className: cn(
      ContainerClasses.root,
      {
        [ContainerClasses.xGutters]: !$enableGutters,
        [ContainerClasses.gutters]: $enableGutters
      },
      className
    ),
    ...props
  });
}
