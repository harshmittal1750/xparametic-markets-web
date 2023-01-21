import { useState } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import { fromPriceChartToLineChartSeries } from 'helpers/chart';
import type { PriceChart } from 'models/market';

import { ChartHeader, LineChart, Text } from 'components';

import { useAppSelector, useTheme } from 'hooks';

const intervals = [
  { id: '24h', name: '24H', value: 24 },
  { id: '7d', name: '7D', value: 168 },
  { id: '30d', name: '30D', value: 720 },
  { id: 'all', name: 'ALL', value: 1440 }
];

function getPricesDiff(priceChart?: PriceChart) {
  const pricesArr = priceChart?.prices;

  if (!pricesArr)
    return {
      sign: 'neutral',
      value: '0',
      pct: '0%'
    };

  const [initial, ...prices] = pricesArr;
  const diffValue = prices[prices.length - 1].value - initial.value;
  const diffSign = Math.sign(diffValue);

  return {
    // eslint-disable-next-line no-nested-ternary
    sign: diffSign > 0 ? 'positive' : diffSign < 0 ? 'negative' : 'neutral',
    value: `${diffValue}`.match(/^.{4}/)?.[0] || 0,
    pct: `${priceChart.changePercent * 100}%`
  } as const;
}

function MarketOverview() {
  const [currentInterval, setCurrentInterval] = useState(
    intervals[intervals.length - 1]
  );
  const market = useAppSelector(state => state.market.market);
  const series = market.outcomes.map(outcome => ({
    name: outcome.title,
    data: fromPriceChartToLineChartSeries(
      outcome.priceCharts?.find(getCurrentInterval)?.prices || []
    )
  }));
  const [outcome] = [...market.outcomes].sort(
    (ocX, ocY) => ocY.price - ocX.price
  );
  const priceChart = outcome.priceCharts?.find(getCurrentInterval);
  const pricesDiff = getPricesDiff(priceChart);
  const chartSign = {
    neutral: '',
    positive: '+',
    negative: '-'
  }[pricesDiff.sign];

  console.log(pricesDiff);

  function getCurrentInterval(chart: PriceChart) {
    return chart.timeframe === currentInterval.id;
  }

  return (
    <>
      <div className="market-chart__header">
        <div>
          <Text scale="tiny-uppercase" color="gray" fontWeight="semibold">
            {outcome.title}
          </Text>
          <Text
            as="h3"
            scale="heading-large"
            fontWeight="semibold"
            className="market-chart__view-title"
          >
            {outcome.price} {market.currency.symbol}
          </Text>
          {priceChart && (
            <>
              <Text
                as="span"
                scale="tiny-uppercase"
                color={
                  (
                    {
                      neutral: 'gray',
                      positive: 'success',
                      negative: 'danger'
                    } as const
                  )[pricesDiff.sign]
                }
                fontWeight="semibold"
              >
                {chartSign}
                {pricesDiff.value} {market.currency.symbol} ({chartSign}
                {pricesDiff.pct})
              </Text>{' '}
              <Text as="span" scale="tiny" color="gray" fontWeight="semibold">
                Since Market Creation
              </Text>
            </>
          )}
        </div>
        <div className="market-chart__header-actions">
          <ChartHeader
            intervals={intervals}
            currentInterval={currentInterval}
            onChangeInterval={setCurrentInterval}
          />
        </div>
      </div>
      <LineChart
        series={series}
        ticker={market.currency?.ticker}
        height={332}
      />
    </>
  );
}
export default function MarketChart() {
  const theme = useTheme();
  const chartViewType = useAppSelector(state => state.market.chartViewType);
  const tradingViewSymbol = useAppSelector(
    state => state.market.market.tradingViewSymbol
  );

  return (
    <div className="market-chart">
      <div className="market-chart__view">
        {
          {
            marketOverview: <MarketOverview />,
            tradingView: (
              <TradingViewWidget
                theme={Themes[theme.theme === 'dark' ? 'DARK' : 'LIGHT']}
                width="100%"
                height={454}
                symbol={tradingViewSymbol}
              />
            )
          }[chartViewType]
        }
      </div>
    </div>
  );
}
