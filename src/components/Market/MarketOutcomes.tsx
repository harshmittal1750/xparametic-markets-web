import { useEffect } from 'react';

import { fromPriceChartToLineChartSeries } from 'helpers/chart';
import sortOutcomes from 'helpers/sortOutcomes';
import kebabCase from 'lodash/kebabCase';
import { Market, Outcome } from 'models/market';
import { marketSelected } from 'redux/ducks/market';
import { selectOutcome } from 'redux/ducks/trade';
import { closeTradeForm, openReportForm, openTradeForm } from 'redux/ducks/ui';

import {
  CheckIcon,
  RemoveIcon,
  RepeatCycleIcon,
  WarningIcon
} from 'assets/icons';

import OutcomeItem from 'components/OutcomeItem';
import { Area } from 'components/plots';

import { useAppDispatch, useAppSelector } from 'hooks';

const outcomeStates = {
  success: { icon: <CheckIcon /> },
  warning: { icon: <WarningIcon /> },
  danger: { icon: <RemoveIcon /> },
  voided: { icon: <RepeatCycleIcon /> }
};

type MarketOutcomesItemProps = {
  market: Market;
  outcome: Outcome;
};

function MarketOutcomesItem({ market, outcome }: MarketOutcomesItemProps) {
  const dispatch = useAppDispatch();
  const selectedOutcomeId = useAppSelector(
    state => state.trade.selectedOutcomeId
  );
  const selectedMarketId = useAppSelector(
    state => state.trade.selectedMarketId
  );
  const selectedMarketNetworkId = useAppSelector(
    state => state.trade.selectedMarketNetworkId
  );

  const { id, marketId, title, price } = outcome;

  const isCurrentSelectedMarketNetwork =
    market.networkId === selectedMarketNetworkId;

  const isCurrentSelectedMarket =
    marketId === selectedMarketId && isCurrentSelectedMarketNetwork;

  const isCurrentSelectedPrediction =
    marketId === selectedMarketId &&
    id === selectedOutcomeId &&
    isCurrentSelectedMarketNetwork;

  const isMarketResolved = market.state === 'resolved';
  const isVoided = market.voided;
  const isWinningOutcome = isMarketResolved && market.resolvedOutcomeId === id;

  useEffect(() => {
    if (isCurrentSelectedPrediction) {
      dispatch(openTradeForm());
    }
  }, [dispatch, isCurrentSelectedPrediction]);

  // using 7d timeframe
  const marketPriceChart = outcome.priceCharts?.find(
    priceChart => priceChart.timeframe === '7d'
  );
  const marketPriceUp =
    !marketPriceChart?.changePercent || marketPriceChart?.changePercent > 0;
  const chartData = fromPriceChartToLineChartSeries(
    marketPriceChart?.prices || []
  );

  function handleItemSelection() {
    if (market.state === 'closed') {
      dispatch(openReportForm());
    } else {
      dispatch(openTradeForm());
    }

    if (!isCurrentSelectedMarket) {
      dispatch(marketSelected(market));
    }

    if (!isCurrentSelectedPrediction) {
      dispatch(selectOutcome(market.id, market.networkId, outcome.id));
    } else {
      dispatch(selectOutcome(market.id, market.networkId, ''));
      dispatch(closeTradeForm());
    }
  }

  return (
    <OutcomeItem
      chart={
        isMarketResolved ? (
          <div className="pm-c-market-outcomes__item-result">
            {isWinningOutcome && !isVoided ? outcomeStates.success.icon : null}
            {!isWinningOutcome && !isVoided ? outcomeStates.danger.icon : null}
            {isVoided ? outcomeStates.voided.icon : null}
          </div>
        ) : (
          <div className="pm-c-market-outcomes__item-chart">
            <Area
              id={`${marketId}-${id}-${kebabCase(title)}`}
              data={chartData}
              color={marketPriceUp ? 'green' : 'red'}
              width={48}
              height={32}
            />
          </div>
        )
      }
      isActive={isCurrentSelectedPrediction}
      isPositive={marketPriceUp}
      isResolved={isMarketResolved}
      isWinning={isWinningOutcome}
      price={price.toFixed(3)}
      currency={market.network.currency.symbol}
      title={title}
      disabled={isMarketResolved}
      onClick={handleItemSelection}
    />
  );
}

type MarketOutcomesProps = {
  market: Market;
};

function MarketOutcomes({ market }: MarketOutcomesProps) {
  const outcomes = sortOutcomes({
    outcomes: market.outcomes,
    timeframe: '7d'
  });

  return (
    <ul className="pm-c-market-outcomes">
      {outcomes.map(outcome => (
        <li key={outcome.id}>
          <MarketOutcomesItem market={market} outcome={outcome} />
        </li>
      ))}
    </ul>
  );
}

export default MarketOutcomes;
