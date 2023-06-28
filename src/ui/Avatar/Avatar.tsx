import { forwardRef } from 'react';

import cn from 'classnames';

import avatarClasses from './Avatar.module.scss';

export type AvatarProps = Pick<
  React.ComponentPropsWithRef<'img'>,
  'src' | 'alt' | 'className' | 'ref'
> & {
  $size?: 'x2s' | 'xs' | 'sm' | 'md' | 'lg';
  $radius?: 'xs' | 'sm' | 'md' | 'lg';
};

export function getAvatarClasses({ $size, $radius }: AvatarProps) {
  return {
    [avatarClasses.radiusXs]: $radius === 'xs',
    [avatarClasses.radiusSm]: $radius === 'sm',
    [avatarClasses.radiusMd]: $radius === 'md',
    [avatarClasses.radiusLg]: $radius === 'lg',
    [avatarClasses.sizeX2s]: $size === 'x2s',
    [avatarClasses.sizeXs]: $size === 'xs',
    [avatarClasses.sizeSm]: $size === 'sm',
    [avatarClasses.sizeMd]: $size === 'md',
    [avatarClasses.sizeLg]: $size === 'lg'
  };
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  { alt, className, ...props },
  ref
) {
  return (
    <img
      ref={ref}
      alt={alt}
      className={cn(getAvatarClasses(props), className)}
      {...props}
    />
  );
});

export default Avatar;
