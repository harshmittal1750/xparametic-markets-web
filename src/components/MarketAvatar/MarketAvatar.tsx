import { forwardRef } from 'react';

import type { Market } from 'models/market';
import { Avatar, AvatarProps } from 'ui';

import { VerifiedIcon } from 'assets/icons';

import marketAvatarClasses from './MarketAvatar.module.scss';

type MarketAvatarProps = Pick<Market, 'imageUrl' | 'verified'> &
  Pick<AvatarProps, '$size'>;

const MarketAvatar = forwardRef<HTMLImageElement, MarketAvatarProps>(
  function MarketAvatar({ imageUrl, $size, verified }, ref) {
    return (
      <div className={marketAvatarClasses.root}>
        <Avatar
          ref={ref}
          $size={$size}
          $radius="lg"
          alt="Market"
          src={imageUrl}
        />
        {verified && (
          <div className={marketAvatarClasses.verified}>
            <VerifiedIcon size="sm" />
          </div>
        )}
      </div>
    );
  }
);

export default MarketAvatar;
