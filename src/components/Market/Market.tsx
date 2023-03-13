import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Market as MarketInterface } from 'models/market';
import { useAverageColor, useMedia } from 'ui';

import MarketAvatar from 'components/MarketAvatar';
import MarketCategory from 'components/MarketCategory';
import Text from 'components/Text';

import { useAppDispatch } from 'hooks';

import MarketFooter from './MarketFooter';
import MarketOutcomes from './MarketOutcomes';

type MarketCardProps = {
  market: MarketInterface;
};

function Market({ market }: MarketCardProps) {
  const dispatch = useAppDispatch();
  const isDesktop = useMedia('(min-width: 1024px)');
  const ref = useRef<HTMLImageElement>(null);
  const RGB = useAverageColor(ref);
  const handleNavigation = useCallback(async () => {
    const { clearMarket } = await import('redux/ducks/market');
    const { openTradeForm } = await import('redux/ducks/ui');
    const { selectOutcome } = await import('redux/ducks/trade');

    dispatch(selectOutcome(market.id, market.networkId, market.outcomes[0].id));
    dispatch(clearMarket());
    dispatch(openTradeForm());
  }, [dispatch, market.id, market.networkId, market.outcomes]);

  useEffect(() => {
    (async function handleMarketsColor() {
      const { setMarketColors } = await import('redux/ducks/ui');

      dispatch(
        setMarketColors({
          [market.id]: `${RGB.red} ${RGB.green} ${RGB.blue}`
        })
      );
    })();
  }, [RGB, dispatch, market.id]);

  return (
    <Link
      className="pm-c-market__body"
      to={`/markets/${market.slug}`}
      onClick={handleNavigation}
    >
      <MarketAvatar
        ref={ref}
        $size="md"
        imageUrl={market.imageUrl}
        verified={!isDesktop && market.verified}
      />
      <div className="pm-c-market__body-details">
        <MarketCategory
          category={market.category}
          subcategory={market.subcategory}
          verified={isDesktop && market.verified}
        />
        <Text as="p" scale="body" fontWeight="medium">
          {market.title}
        </Text>
      </div>
    </Link>
  );
}

Market.Outcomes = MarketOutcomes;
Market.Footer = MarketFooter;

export default Market;
