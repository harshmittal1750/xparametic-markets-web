import { AnimatePresence, motion } from 'framer-motion';
import type { Market } from 'models/market';
import { Avatar, AvatarProps, Skeleton, useImage } from 'ui';

import { VerifiedIcon } from 'assets/icons';

import marketAvatarClasses from './MarketAvatar.module.scss';

type MarketAvatarProps = Pick<Market, 'imageUrl' | 'verified'> &
  Pick<AvatarProps, '$size'>;

export default function MarketAvatar({
  imageUrl,
  $size,
  verified
}: MarketAvatarProps) {
  const [state, imageProps] = useImage();

  return (
    <div className={marketAvatarClasses.root}>
      {/** TODO: This may be moved to Image = useImageAsync */}
      <AnimatePresence>
        {state === 'load' && (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
          >
            <Skeleton style={{ position: 'absolute', width: 64, height: 64 }} />
          </motion.div>
        )}
      </AnimatePresence>
      <Avatar
        $radius="lg"
        alt="Market"
        $size={$size}
        src={imageUrl}
        style={{
          transition: 'opacity 200ms ease',
          opacity: state === 'load' ? 0 : 1
        }}
        {...imageProps}
      />
      {verified && (
        <div className={marketAvatarClasses.verified}>
          <VerifiedIcon size="sm" />
        </div>
      )}
    </div>
  );
}
