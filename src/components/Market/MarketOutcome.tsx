import { useEffect } from 'react';

import kebabCase from 'lodash/kebabCase';
import { Market } from 'models/market';
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

type MarketOutcomeProps = {
  market: Market;
  outcome: {
    id: string | number;
    title: string;
    state: {
      isDefault: boolean;
      isSuccess: boolean;
      isDanger: boolean;
      isActive: boolean;
    };
    price: {
      isPriceUp: boolean;
      value: string;
      lastWeekPricesChartSeries: any;
    };
    result: {
      isResolved: boolean;
      state: {
        isWon: boolean;
        isLoss: boolean;
        isVoided: boolean;
      };
    };
  };
};

function MarketOutcome({ market, outcome }: MarketOutcomeProps) {
  const dispatch = useAppDispatch();
  const symbol = useAppSelector(state => state.market.market.currency.symbol);
  const { id: marketId } = market;
  const { id, title, state, price, result } = outcome;
  const { isPriceUp, lastWeekPricesChartSeries } = price;

  useEffect(() => {
    if (state.isActive) {
      dispatch(openTradeForm());
    }
  }, [dispatch, state.isActive]);

  function handleItemSelection() {
    if (market.state === 'closed') {
      dispatch(openReportForm());
    } else {
      dispatch(openTradeForm());
    }

    dispatch(marketSelected(market));

    if (!state.isActive) {
      dispatch(selectOutcome(market.id, market.networkId, outcome.id));
    } else {
      dispatch(selectOutcome(market.id, market.networkId, ''));
      dispatch(closeTradeForm());
    }
  }

  return (
    <OutcomeItem
      title={title}
      price={price.value}
      currency={symbol}
      isActive={state.isActive}
      isPositive={price.isPriceUp}
      isResolved={result.isResolved}
      isWinning={state.isSuccess || !state.isDanger}
      disabled={result.isResolved}
      onClick={handleItemSelection}
      chart={
        result.isResolved ? (
          <div className="pm-c-market-outcomes__item-result">
            {result.state.isWon ? outcomeStates.success.icon : null}
            {result.state.isLoss ? outcomeStates.danger.icon : null}
            {result.state.isVoided ? outcomeStates.voided.icon : null}
          </div>
        ) : (
          <div className="pm-c-market-outcomes__item-chart">
            <Area
              id={`${marketId}-${id}-${kebabCase(title)}`}
              data={lastWeekPricesChartSeries}
              color={isPriceUp ? 'green' : 'red'}
              width={48}
              height={30}
            />
          </div>
        )
      }
    />
  );
}

export default MarketOutcome;
