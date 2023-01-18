import { useState } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import { fromPriceChartToLineChartSeries } from 'helpers/chart';

import { ChartHeader, LineChart, Text } from 'components';

import { useAppSelector, useTheme } from 'hooks';

const intervals = [
  { id: '24h', name: '24H', value: 24 },
  { id: '7d', name: '7D', value: 168 },
  { id: '30d', name: '30D', value: 720 },
  { id: 'all', name: 'ALL', value: 1440 }
];

function MarketOverview() {
  const [currentInterval, setCurrentInterval] = useState(1440);
  const market = useAppSelector(state => state.market.market);
  const timeframe = intervals.find(
    interval => interval.value === currentInterval
  );
  const series = market.outcomes.map(outcome => {
    const chart = outcome.priceCharts?.find(
      priceChart => priceChart.timeframe === timeframe?.id
    );

    return {
      name: outcome.title,
      data: fromPriceChartToLineChartSeries(chart?.prices || [])
    };
  });

  return (
    <>
      <div className="market-chart__header">
        <Text
          as="h2"
          scale="body"
          fontWeight="semibold"
          className="market-chart__view-title"
        >
          Market Overview
        </Text>
        <div className="market-chart__header-actions">
          <ChartHeader
            intervals={intervals}
            defaultIntervalId="all"
            onChangeInterval={(_interval, value) => setCurrentInterval(value)}
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
