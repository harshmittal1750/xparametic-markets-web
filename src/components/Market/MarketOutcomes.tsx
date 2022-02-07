import { useEffect } from 'react';

import classNames from 'classnames';
import { fromPriceChartToLineChartSeries } from 'helpers/chart';
import { Market, Outcome } from 'models/market';
import { marketSelected } from 'redux/ducks/market';
import { selectOutcome } from 'redux/ducks/trade';
import { closeTradeForm, openReportForm, openTradeForm } from 'redux/ducks/ui';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  RemoveIcon,
  RepeatCycleIcon,
  WarningIcon
} from 'assets/icons';

import { useAppDispatch, useAppSelector } from 'hooks';

import MiniAreaChart from '../MiniAreaChart';
import Text from '../Text';

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

  const { id, marketId, title, price } = outcome;

  const isCurrentSelectedPrediction =
    marketId === selectedMarketId && id === selectedOutcomeId;

  const isMarketResolved = market.state === 'resolved';
  const isVoided = market.voided;
  const isWinningOutcome = isMarketResolved && market.resolvedOutcomeId === id;

  useEffect(() => {
    if (isCurrentSelectedPrediction) {
      dispatch(openTradeForm());
    }
  }, [dispatch, isCurrentSelectedPrediction]);

  // using 7d timeframe
  const marketPriceChart = outcome.priceCharts.find(
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
    dispatch(marketSelected(market));

    if (!isCurrentSelectedPrediction) {
      dispatch(selectOutcome(market.id, outcome.id));
    } else {
      dispatch(selectOutcome(market.id, ''));
      dispatch(closeTradeForm());
    }
  }

  return (
    <button
      type="button"
      className={classNames({
        'pm-c-market-outcomes__item--default': !isMarketResolved,
        'pm-c-market-outcomes__item--success': isWinningOutcome,
        'pm-c-market-outcomes__item--danger': !isWinningOutcome,
        active: isCurrentSelectedPrediction
      })}
      disabled={isMarketResolved}
      onClick={handleItemSelection}
    >
      <div className="pm-c-market-outcomes__item-group--column">
        <Text
          as="p"
          scale="caption"
          fontWeight="semibold"
          className="pm-c-market-outcomes__item-title"
        >
          {title}
        </Text>
        <div className="pm-c-market-outcomes__item-group--row">
          <Text
            as="p"
            scale="tiny-uppercase"
            fontWeight="medium"
            className="pm-c-market-outcomes__item-odd"
          >
            PRICE
          </Text>
          <Text
            as="span"
            scale="tiny"
            fontWeight="medium"
            className="pm-c-market-outcomes__item-value"
          >
            {price.toFixed(3)}
          </Text>
          {!isMarketResolved ? (
            <>{marketPriceUp ? <ArrowUpIcon /> : <ArrowDownIcon />}</>
          ) : null}
        </div>
      </div>
      {isMarketResolved ? (
        <div className="pm-c-market-outcomes__item-result">
          {isWinningOutcome && !isVoided ? outcomeStates.success.icon : null}
          {!isWinningOutcome && !isVoided ? outcomeStates.danger.icon : null}
          {isVoided ? outcomeStates.voided.icon : null}
        </div>
      ) : (
        <div className="pm-c-market-outcomes__item-chart">
          <MiniAreaChart
            serie={chartData}
            color={marketPriceUp ? 'success' : 'danger'}
            width={48}
          />
        </div>
      )}
    </button>
  );
}

type MarketOutcomesProps = {
  market: Market;
};

function MarketOutcomes({ market }: MarketOutcomesProps) {
  const { outcomes } = market;
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
