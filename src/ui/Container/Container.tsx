import { createElement, forwardRef } from 'react';

import cn from 'classnames';

import ContainerClasses from './Container.module.scss';

export interface ContainerProps<E extends keyof JSX.IntrinsicElements>
  extends Pick<
    React.ComponentPropsWithRef<'div'>,
    'children' | 'className' | 'style'
  > {
  $enableGutters?: boolean;
  $as?: E;
  $size?: 'sm' | 'md';
}

export default forwardRef(function Container<
  E extends keyof JSX.IntrinsicElements
>(
  { className, $enableGutters, $as, $size, ...props }: ContainerProps<E>,
  ref: React.Ref<Element>
) {
  return createElement($as || 'div', {
    ref,
    className: cn(
      ContainerClasses.root,
      {
        [ContainerClasses.guttersX]: !$enableGutters,
        [ContainerClasses.gutters]: $enableGutters,
        [ContainerClasses.sizeSm]: $size === 'sm',
        [ContainerClasses.sizeMd]: $size === 'md'
      },
      className
    ),
    ...props
  });
});
