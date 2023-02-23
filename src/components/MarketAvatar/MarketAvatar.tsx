import type { Market } from 'models/market';
import { Avatar, AvatarProps } from 'ui';

import { VerifiedIcon } from 'assets/icons';

import marketAvatarClasses from './MarketAvatar.module.scss';

export default function MarketAvatar({
  imageUrl,
  $size,
  verified
}: Pick<Market, 'imageUrl' | 'verified'> & Pick<AvatarProps, '$size'>) {
  return (
    <div className={marketAvatarClasses.root}>
      <Avatar $size={$size} $radius="lg" alt="Market" src={imageUrl} />
      {verified && (
        <div className={marketAvatarClasses.verified}>
          <VerifiedIcon size="sm" />
        </div>
      )}
    </div>
  );
}
