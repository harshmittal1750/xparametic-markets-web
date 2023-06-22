import type { ComponentPropsWithoutRef } from 'react';

import cn from 'classnames';

import skeletonClasses from './Skeleton.module.scss';

interface SkeletonProps
  extends Pick<ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  $radius?: 'full';
}

export default function Skeleton({
  className,
  $radius,
  ...props
}: SkeletonProps) {
  return (
    <span
      role="alert"
      aria-busy
      className={cn(
        skeletonClasses.root,
        {
          [skeletonClasses.radiusDefault]: !$radius,
          [skeletonClasses.radiusFull]: $radius === 'full'
        },
        className
      )}
      {...props}
    />
  );
}
