import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Market as MarketInterface } from 'models/market';
import { useAverageColor } from 'ui';

import { useAppDispatch } from 'hooks';

import Breadcrumb from '../Breadcrumb';
import Text from '../Text';
import MarketFooter from './MarketFooter';
import MarketOutcomes from './MarketOutcomes';

type MarketCardProps = {
  market: MarketInterface;
};

function Market({ market }: MarketCardProps) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLImageElement>(null);
  const RGB = useAverageColor(ref);
  const handleNavigation = useCallback(async () => {
    const { clearMarket } = await import('redux/ducks/market');
    const { openTradeForm } = await import('redux/ducks/ui');
    const { selectOutcome } = await import('redux/ducks/trade');
    const { setMarketAvatarColor } = await import('redux/ducks/ui');

    dispatch(setMarketAvatarColor(`${RGB.red} ${RGB.green} ${RGB.blue}`));
    dispatch(selectOutcome(market.id, market.networkId, market.outcomes[0].id));
    dispatch(clearMarket());
    dispatch(openTradeForm());
  }, [RGB, dispatch, market.id, market.networkId, market.outcomes]);

  return (
    <Link
      className="pm-c-market__body"
      to={`/markets/${market.slug}`}
      onClick={handleNavigation}
    >
      <figure className="pm-c-market__body-avatar">
        <img
          ref={ref}
          className="pm-c-market__body-image"
          src={market.imageUrl}
          alt="Market Avatar"
        />
      </figure>
      <div className="pm-c-market__body-details">
        <Breadcrumb>
          <Breadcrumb.Item>{market.category}</Breadcrumb.Item>
          <Breadcrumb.Item>{market.subcategory}</Breadcrumb.Item>
        </Breadcrumb>
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
