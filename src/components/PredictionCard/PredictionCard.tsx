import { memo } from 'react';

import cn from 'classnames';
import { Market as MarketInterface } from 'models/market';

import MarketFooterActions from 'components/Market/MarketFooterActions';

import Market from '../Market';

interface PredictionCardProps
  extends Pick<React.ComponentPropsWithoutRef<'div'>, 'className'> {
  market: MarketInterface;
  $gutter?: boolean;
}

function PredictionCard({ market, $gutter, className }: PredictionCardProps) {
  return (
    <div
      className={cn(
        'prediction-card',
        { 'prediction-card--gutter': $gutter },
        className
      )}
    >
      <div className="prediction-card__body">
        <Market market={market} />
        <Market.Outcomes market={market} />
      </div>
      <div className="prediction-card__footer">
        <Market.Footer market={market}>
          <MarketFooterActions $variant="text" market={market} />
          <div className="pm-c-market-footer__divider--circle" />
        </Market.Footer>
      </div>
    </div>
  );
}

export default memo(PredictionCard);
