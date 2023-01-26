import { useState } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import sortOutcomes from 'helpers/sortOutcomes';

import { ChartHeader, LineChart, Text } from 'components';

import { useAppSelector, useTheme } from 'hooks';

const intervals = [
  { id: '24h', name: '24H', value: 24 },
  { id: '7d', name: '7D', value: 168 },
  { id: '30d', name: '30D', value: 720 },
  { id: 'all', name: 'ALL', value: 1440 }
];
const signColors = {
  neutral: 'gray',
  positive: 'success',
  negative: 'danger'
} as const;

function MarketOverview() {
  const outcomes = useAppSelector(state => state.market.market.outcomes);
  const symbol = useAppSelector(state => state.market.market.currency.symbol);
  const ticker = useAppSelector(state => state.market.market.currency.ticker);
  const [currentInterval, setCurrentInterval] = useState(
    intervals[intervals.length - 1]
  );
  const [highOutcome, ...restOutcomes] = sortOutcomes({
    outcomes,
    timeframe: currentInterval.id
  });
  const chartSign = highOutcome.pricesDiff.sign === 'positive' ? '+' : '';

  return (
    <>
      <div className="market-chart__header">
        <div>
          <Text scale="tiny-uppercase" color="gray" fontWeight="semibold">
            {highOutcome.title}
          </Text>
          <Text
            as="h3"
            scale="heading-large"
            fontWeight="semibold"
            className="market-chart__view-title"
          >
            {highOutcome.price} {symbol}
          </Text>
          <Text
            as="span"
            scale="tiny-uppercase"
            color={signColors[highOutcome.pricesDiff.sign]}
            fontWeight="semibold"
          >
            {chartSign}
            {highOutcome.pricesDiff.value} {symbol} ({chartSign}
            {highOutcome.pricesDiff.pct})
          </Text>{' '}
          <Text as="span" scale="tiny" color="gray" fontWeight="semibold">
            Since Market Creation
          </Text>
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
        series={[highOutcome, ...restOutcomes]}
        ticker={ticker}
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
