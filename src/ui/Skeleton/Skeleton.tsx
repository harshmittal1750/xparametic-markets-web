import type { ComponentPropsWithoutRef } from 'react';

import cn from 'classnames';

import skeletonClasses from './Skeleton.module.scss';

type SkeletonProps = Pick<
  ComponentPropsWithoutRef<'span'>,
  'className' | 'style'
>;

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <span
      role="alert"
      aria-busy
      className={cn(skeletonClasses.root, className)}
      {...props}
    />
  );
}
