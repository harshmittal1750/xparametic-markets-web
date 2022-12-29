import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Market as MarketInterface } from 'models/market';
import { clearMarket } from 'redux/ducks/market';
import { openTradeForm } from 'redux/ducks/ui';

import { useAppDispatch } from 'hooks';

import Market from '../Market';

interface PredictionCardProps extends React.ComponentPropsWithoutRef<'div'> {
  market: MarketInterface;
}

function PredictionCard({ market, ...props }: PredictionCardProps) {
  const dispatch = useAppDispatch();
  const handleNavigation = useCallback(() => {
    dispatch(clearMarket());
    dispatch(openTradeForm());
  }, [dispatch]);

  return (
    <div className="prediction-card" {...props}>
      <div className="prediction-card__body">
        <Link to={`/markets/${market.slug}`} onClick={handleNavigation}>
          <Market market={market} />
        </Link>
        <Market.Outcomes market={market} />
      </div>
      <div className="prediction-card__footer">
        <Market.Footer market={market} />
      </div>
    </div>
  );
}

export default memo(PredictionCard);
