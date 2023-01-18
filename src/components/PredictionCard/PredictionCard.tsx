import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { Market as MarketInterface } from 'models/market';
import { clearMarket } from 'redux/ducks/market';
import { openTradeForm } from 'redux/ducks/ui';

import MarketFooterActions from 'components/Market/MarketFooterActions';

import { useAppDispatch } from 'hooks';

import Market from '../Market';

interface PredictionCardProps extends React.ComponentPropsWithoutRef<'div'> {
  market: MarketInterface;
}

function PredictionCard({ market, className, ...props }: PredictionCardProps) {
  const dispatch = useAppDispatch();
  const handleNavigation = useCallback(() => {
    dispatch(clearMarket());
    dispatch(openTradeForm());
  }, [dispatch]);

  return (
    <div className={cn('prediction-card', className)} {...props}>
      <div className="prediction-card__body">
        <Link to={`/markets/${market.slug}`} onClick={handleNavigation}>
          <Market market={market} />
        </Link>
        <Market.Outcomes market={market} />
      </div>
      <div className="prediction-card__footer">
        <Market.Footer market={market}>
          <MarketFooterActions market={market} />
          <div className="pm-c-market-footer__divider--circle" />
        </Market.Footer>
      </div>
    </div>
  );
}

export default memo(PredictionCard);
