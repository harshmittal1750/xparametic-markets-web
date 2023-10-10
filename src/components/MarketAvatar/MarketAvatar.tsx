import type { Market } from 'models/market';
import { Image } from 'ui';
import type { ImageProps } from 'ui';

import { VerifiedIcon } from 'assets/icons';

import Logos from 'components/Logos';

import marketAvatarClasses from './MarketAvatar.module.scss';

type MarketAvatarProps = Pick<Market, 'verified'> &
  Pick<ImageProps, '$size' | '$radius'> &
  Record<'imageUrl', string>;

export default function MarketAvatar({
  imageUrl,
  verified,
  ...props
}: MarketAvatarProps) {
  return (
    <div className={marketAvatarClasses.root}>
      <Image alt="Market" src={imageUrl} {...props}>
        <Logos size="md" standard="mono" />
      </Image>
      {verified && (
        <div className={marketAvatarClasses.verified}>
          <VerifiedIcon size="sm" />
        </div>
      )}
    </div>
  );
}
