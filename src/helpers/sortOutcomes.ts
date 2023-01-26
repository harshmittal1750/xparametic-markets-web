import { fromPriceChartToLineChartSeries } from 'helpers/chart';
import { roundNumber } from 'helpers/math';
import type { Outcome, PriceChart } from 'models/market';

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

export default function sortOutcomes(args: SortOutcomes) {
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
