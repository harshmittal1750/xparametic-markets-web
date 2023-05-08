import { environment } from 'config';
import dayjs from 'dayjs';
import { inRange } from 'lodash';
import { Market } from 'models/market';

import Pill from 'components/Pill/Pill';
import VoteArrows from 'components/VoteArrows';

import marketClasses from './Market.module.scss';
import MarketFooterStats from './MarketFooterStats';

type MarketFooterProps = React.PropsWithChildren<{
  market: Market;
}>;

const tags = {
  awaiting: {
    children: 'Awaiting Resolution',
    color: 'warning',
    variant: 'normal'
  },
  ending: {
    children: 'Ending Soon',
    color: 'danger',
    variant: 'subtle'
  },
  new: {
    children: 'New',
    color: 'success',
    variant: 'subtle'
  },
  resolved: {
    children: 'Resolved',
    color: 'success',
    variant: 'normal'
  },
  voided: {
    children: 'Voided',
    color: 'danger',
    variant: 'normal'
  }
};

export default function MarketFooter({ market, children }: MarketFooterProps) {
  const { id, slug, network, votes } = market;
  const tag = (() => {
    if (market.state === 'closed') return 'awaiting';
    if (inRange(dayjs().diff(dayjs(market.expiresAt), 'hours'), -24, 1))
      return 'ending';
    if (inRange(dayjs(market.createdAt).diff(dayjs(), 'hours'), -24, 1))
      return 'new';
    if (market.state === 'resolved' && !market.voided) return 'resolved';
    if (market.voided) return 'voided';
    return '';
  })();

  return (
    <div className={`pm-c-market-footer ${marketClasses.footer}`}>
      <MarketFooterStats market={market} />
      <div className="pm-c-market-footer__group--row">
        {children}
        {tag && (
          <>
            {children?.toString() && (
              <div className="pm-c-market-footer__divider--circle" />
            )}
            <div className="pm-c-market-footer__tags">
              <Pill badge {...tags[tag]} />
            </div>
          </>
        )}
        {environment.FEATURE_VOTING && (
          <>
            <div className="pm-c-market-footer__divider--circle" />
            <VoteArrows
              key={slug}
              size="sm"
              marketId={id}
              marketSlug={slug}
              marketNetworkId={network.id}
              votes={votes}
            />
          </>
        )}
      </div>
    </div>
  );
}
