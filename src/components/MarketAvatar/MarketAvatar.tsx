import type { Market } from 'models/market';
import { AvatarProps, Image } from 'ui';

import { VerifiedIcon } from 'assets/icons';

import marketAvatarClasses from './MarketAvatar.module.scss';

type MarketAvatarProps = Pick<Market, 'imageUrl' | 'verified'> &
  Pick<AvatarProps, '$size'>;

export default function MarketAvatar({
  imageUrl,
  $size,
  verified
}: MarketAvatarProps) {
  return (
    <div className={marketAvatarClasses.root}>
      <Image $radius="full" alt="Market" $size={$size} src={imageUrl} />
      {verified && (
        <div className={marketAvatarClasses.verified}>
          <VerifiedIcon size="sm" />
        </div>
      )}
    </div>
  );
}
