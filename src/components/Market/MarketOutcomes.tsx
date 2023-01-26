import { useCallback, useMemo } from 'react';

import { fromPriceChartToLineChartSeries } from 'helpers/chart';
import { Market, Outcome } from 'models/market';

import { useAppSelector } from 'hooks';

import MarketOutcome from './MarketOutcome';
import MarketOutcomeMultiple from './MarketOutcomeMultiple';

type MarketOutcomesProps = {
  market: Market;
};

function MarketOutcomes({ market }: MarketOutcomesProps) {
  const { outcomes, resolvedOutcomeId } = market;

  const { selectedMarketId, selectedOutcomeId, selectedMarketNetworkId } =
    useAppSelector(state => state.trade);

  const isCurrentSelectedMarketNetwork =
    market.networkId === selectedMarketNetworkId;
  const isMarketResolved = market.state === 'resolved';
  const isMarketVoided = market.voided;

  const buildOutcomeObject = useCallback(
    (outcome: Outcome) => {
      const { id, marketId, title, price } = outcome;

      // States
      const isSelectedOutcome =
        marketId === selectedMarketId &&
        id === selectedOutcomeId &&
        isCurrentSelectedMarketNetwork;

      const isWinningOutcome = isMarketResolved && resolvedOutcomeId === id;

      // Prices
      const lastWeekPrices = outcome.priceCharts?.find(
        priceChart => priceChart.timeframe === '7d'
      );
      const lastWeekPricesChartSeries = fromPriceChartToLineChartSeries(
        lastWeekPrices?.prices || []
      );
      const isPriceUp =
        !lastWeekPrices?.changePercent || lastWeekPrices?.changePercent > 0;

      return {
        id,
        title,
        state: {
          isDefault: !isMarketResolved,
          isSuccess: isWinningOutcome,
          isDanger: !isWinningOutcome,
          isActive: isSelectedOutcome
        },
        price: {
          isPriceUp,
          value: price.toFixed(3),
          lastWeekPricesChartSeries
        },
        result: {
          isResolved: isMarketResolved,
          state: {
            isWon: isWinningOutcome && !isMarketVoided,
            isLoss: !isWinningOutcome && !isMarketVoided,
            isVoided: isMarketVoided
          }
        }
      };
    },
    [
      isCurrentSelectedMarketNetwork,
      isMarketResolved,
      isMarketVoided,
      resolvedOutcomeId,
      selectedMarketId,
      selectedOutcomeId
    ]
  );

  const buildOutcomeMultipleObject = useCallback(
    (outcomesSlice: Outcome[]) => {
      const ids = outcomesSlice.map(outcome => outcome.id);
      const titles = outcomesSlice.map(outcome => outcome.title);

      const title = `${titles.length}+ ${'Outcome'}${
        titles.length !== 1 ? 's' : ''
      }`;

      const subtitle = titles.join(', ');

      // States
      const isSelectedOutcome =
        market.id === selectedMarketId &&
        ids.includes(selectedOutcomeId) &&
        isCurrentSelectedMarketNetwork;
      const isWinningOutcome =
        isMarketResolved && ids.includes(resolvedOutcomeId);

      return {
        ids,
        title,
        subtitle,
        state: {
          isDefault: !isMarketResolved,
          isSuccess: isWinningOutcome,
          isDanger: !isWinningOutcome,
          isActive: isSelectedOutcome
        },
        result: {
          isResolved: isMarketResolved,
          state: {
            isWon: isWinningOutcome && !isMarketVoided,
            isLoss: !isWinningOutcome && !isMarketVoided,
            isVoided: isMarketVoided
          }
        }
      };
    },
    [
      isCurrentSelectedMarketNetwork,
      isMarketResolved,
      isMarketVoided,
      market.id,
      resolvedOutcomeId,
      selectedMarketId,
      selectedOutcomeId
    ]
  );

  const hasMultipleOutcomes = outcomes.length > 3;

  const outcomesObjects = useMemo(() => {
    if (hasMultipleOutcomes) {
      return outcomes.slice(0, 3).map(outcome => buildOutcomeObject(outcome));
    }

    return outcomes.slice(0, 3).map(outcome => buildOutcomeObject(outcome));
  }, [buildOutcomeObject, hasMultipleOutcomes, outcomes]);

  const multipleOutcomesObject = useMemo(() => {
    if (!hasMultipleOutcomes) return undefined;
    return buildOutcomeMultipleObject(outcomes.slice(3));
  }, [buildOutcomeMultipleObject, hasMultipleOutcomes, outcomes]);

  return (
    <ul className="pm-c-market-outcomes">
      {outcomesObjects.map(outcome => (
        <li key={outcome.id}>
          <MarketOutcome market={market} outcome={outcome} />
        </li>
      ))}
      {multipleOutcomesObject ? (
        <li>
          <MarketOutcomeMultiple
            market={market}
            outcome={multipleOutcomesObject}
          />
        </li>
      ) : null}
    </ul>
  );
}

export default MarketOutcomes;
