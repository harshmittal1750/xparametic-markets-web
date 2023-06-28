import { forwardRef } from 'react';

import cn from 'classnames';

import avatarClasses from './Avatar.module.scss';

export type AvatarProps = Pick<
  React.ComponentPropsWithRef<'img'>,
  // TODO: omit [style]
  'src' | 'alt' | 'className' | 'ref' | 'style'
> & {
  $size?: 'x2s' | 'xs' | 'sm' | 'md' | 'lg';
  $radius?: 'xs' | 'sm' | 'md' | 'lg';
};

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  { $size, $radius, className, ...props },
  ref
) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      ref={ref}
      className={cn(
        {
          [avatarClasses.radiusXs]: $radius === 'xs',
          [avatarClasses.radiusSm]: $radius === 'sm',
          [avatarClasses.radiusMd]: $radius === 'md',
          [avatarClasses.radiusLg]: $radius === 'lg',
          [avatarClasses.sizeX2s]: $size === 'x2s',
          [avatarClasses.sizeXs]: $size === 'xs',
          [avatarClasses.sizeSm]: $size === 'sm',
          [avatarClasses.sizeMd]: $size === 'md',
          [avatarClasses.sizeLg]: $size === 'lg'
        },
        className
      )}
      {...props}
    />
  );
});

export default Avatar;
