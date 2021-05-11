import dayjs from 'dayjs';
import { roundNumber } from 'helpers/math';
import { Market } from 'models/market';

import { Card, MiniAreaChart, Text } from 'components';

import useCurrency from 'hooks/useCurrency';

type PriceEvent = {
  x: dayjs.Dayjs;
  y: number;
};

type MarketStatsProps = {
  market: Market;
};

function MarketStats({ market }: MarketStatsProps) {
  const { symbol } = useCurrency();
  const outcomeStats = market.outcomes.map(outcome => {
    const chartData = outcome.priceCharts.find(
      chart => chart.timeframe === '24h'
    );

    const changePercent = chartData?.changePercent ?? 0;
    const changeColor = changePercent >= 0 ? 'success' : 'danger';

    return {
      title: outcome.title,
      price: outcome.price,
      changePercent,
      changeColor
    };
  });

  return (
    <div className="pm-market__stats">
      <Card
        className="pm-market__stats-item"
        size="lg"
        title={
          <Text
            as="label"
            scale="tiny-uppercase"
            fontWeight="bold"
            color="gray"
          >
            {outcomeStats[0].title}
          </Text>
        }
      >
        <Text as="p" scale="body" fontWeight="semibold" color="light">
          {`${outcomeStats[0].price} ${symbol}`}
        </Text>
      </Card>
      <Card
        className="pm-market__stats-item"
        size="lg"
        title={
          <Text
            as="label"
            scale="tiny-uppercase"
            fontWeight="bold"
            color="gray"
          >
            24H %
          </Text>
        }
      >
        <Text
          as="p"
          scale="body"
          fontWeight="semibold"
          // eslint-disable-next-line no-undef
          color={outcomeStats[0].changeColor as any}
        >
          {`${roundNumber(
            Math.abs(outcomeStats[0].changePercent || 0) * 100,
            2
          )}%`}
        </Text>
      </Card>
      <Card
        className="pm-market__stats-item"
        size="lg"
        title={
          <Text
            as="label"
            scale="tiny-uppercase"
            fontWeight="bold"
            color="gray"
          >
            {outcomeStats[1].title}
          </Text>
        }
      >
        <Text as="p" scale="body" fontWeight="semibold" color="light">
          {`${outcomeStats[1].price} ${symbol}`}
        </Text>
      </Card>
      <Card
        className="pm-market__stats-item"
        size="lg"
        title={
          <Text
            as="label"
            scale="tiny-uppercase"
            fontWeight="bold"
            color="gray"
          >
            24H %
          </Text>
        }
      >
        <Text
          as="p"
          scale="body"
          fontWeight="semibold"
          color={outcomeStats[1].changeColor as any}
        >
          {`${roundNumber(
            Math.abs(outcomeStats[1].changePercent || 0) * 100,
            2
          )}%`}
        </Text>
      </Card>
    </div>
  );
}

MarketStats.displayName = 'MarketStats';

export default MarketStats;
