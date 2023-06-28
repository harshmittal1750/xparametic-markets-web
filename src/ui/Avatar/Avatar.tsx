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

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  { $size, $radius, className, ...props },
  ref
) {
  const { src, alt } = props;

  return (
    <div
      className={cn(
        avatarClasses.root,
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
    >
      {/* TODO: check wheter !image or error */}
      {src ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img ref={ref} className={avatarClasses.image} {...props} />
      ) : (
        <div className={avatarClasses.caption}>
          <strong className={avatarClasses.captionText}>
            {alt?.toUpperCase().match(/\w/)}
          </strong>
        </div>
      )}
    </div>
  );
});

export default Avatar;
