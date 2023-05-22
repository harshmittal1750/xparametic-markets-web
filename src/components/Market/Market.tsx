import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Market as MarketInterface } from 'models/market';
import { useTheme } from 'ui';

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
  const theme = useTheme();
  const handleNavigation = useCallback(async () => {
    const { clearMarket } = await import('redux/ducks/market');
    const { openTradeForm } = await import('redux/ducks/ui');
    const { selectOutcome } = await import('redux/ducks/trade');

    dispatch(selectOutcome(market.id, market.networkId, market.outcomes[0].id));
    dispatch(clearMarket());
    dispatch(openTradeForm());
  }, [dispatch, market.id, market.networkId, market.outcomes]);

  return (
    <Link
      className="pm-c-market__body"
      to={`/markets/${market.slug}`}
      onClick={handleNavigation}
    >
      <MarketAvatar
        $size="md"
        imageUrl={market.imageUrl}
        verified={!theme.device.isDesktop && market.verified}
      />
      <div className="pm-c-market__body-details">
        <MarketCategory
          category={market.category}
          subcategory={market.subcategory}
          verified={theme.device.isDesktop && market.verified}
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
