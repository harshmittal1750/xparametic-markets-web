import { Market } from 'models/market';

import VoteArrows from 'components/VoteArrows';

import MarketFooterActions from './MarketFooterActions';
import MarketFooterStats from './MarketFooterStats';
import MarketFooterTags from './MarketFooterTags';

type MarketFooterProps = {
  market: Market;
};

function MarketFooter({ market }: MarketFooterProps) {
  const { id, slug, state, network, votes, verified } = market;

  const isVerified = verified;
  const isOpen = state === 'open';

  return (
    <div className="pm-c-market-footer">
      <MarketFooterStats market={market} />
      <div className="pm-c-market-footer__group--row">
        <MarketFooterActions market={market} />
        <MarketFooterTags market={market} />
        {!isVerified && isOpen ? (
          <>
            <div className="pm-c-market-footer__divider--circle" />
            <VoteArrows
              key={slug}
              size="sm"
              marketId={id}
              marketSlug={slug}
              marketNetworkId={network.id}
              marketState={state}
              votes={votes}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

MarketFooter.displayName = 'MarketFooter';

export default MarketFooter;
