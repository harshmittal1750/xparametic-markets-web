import { useCallback, useState } from 'react';

import { fromPriceChartToLineChartSeries } from 'helpers/chart';
import { roundNumber } from 'helpers/math';
import type { Outcome, PriceChart } from 'models/market';

import useAppSelector from 'hooks/useAppSelector';

type UseOutcomes = {
  max?: number;
};

type SortOutcomes = {
  timeframe: string;
  outcomes: Outcome[];
};

function getPricesDiff(priceChart?: PriceChart) {
  const pricesArr = priceChart?.prices;

  if (!pricesArr)
    return {
      value: '0',
      pct: '0%'
    };

  const [initial, ...prices] = pricesArr;
  const diffValue = prices[prices.length - 1].value - initial.value;
  const diffSign = Math.sign(diffValue) < 0 ? '-' : '+';

  return {
    value: `${diffSign}${roundNumber(diffValue, 3)}`,
    pct: `${diffSign}${roundNumber(
      Math.abs(priceChart.changePercent || 0) * 100,
      2
    )}%`
  } as const;
}
function sortOutcomes(args: SortOutcomes) {
  return [...args.outcomes]
    .sort((compareA, compareB) => compareB.price - compareA.price)
    .map(outcome => {
      const priceChart = outcome.priceCharts?.find(
        chart => chart.timeframe === args.timeframe
      );

      return {
        ...outcome,
        pricesDiff: getPricesDiff(priceChart),
        name: outcome.title,
        data: fromPriceChartToLineChartSeries(priceChart?.prices || [])
      };
    });
}

export default function useOutcomes({ max = 2 }: UseOutcomes = {}) {
  const outcomes = useAppSelector(state => state.market.market.outcomes);
  const [isExpanded, setExpanded] = useState(outcomes.length < 3);
  const expand = useCallback(() => setExpanded(true), []);
  const sorted = sortOutcomes({
    outcomes,
    timeframe: '7d'
  });
  const onseted = sorted.slice(0, isExpanded ? undefined : max);
  const offseted = sorted.slice(isExpanded ? undefined : max);
  const isSingle = offseted.length === 1;

  return {
    isExpanded,
    expand,
    onseted,
    offseted: {
      percent:
        +(
          offseted
            .map(outcome => outcome.price)
            .reduce((prices, price) => price + prices, 0) / offseted.length
        ).toFixed(3) * 100,
      primary: `+${offseted.length} Outcome${isSingle ? '' : 's'}`,
      secondary: `${offseted
        .slice(0, 2)
        .map(outcome => outcome.name)
        .join(', ')}${isSingle ? '' : '...'}`
    }
  } as const;
}
