import { roundNumber } from 'helpers/math';
import { Market } from 'models/market';

import { Card, Text } from 'components';

import { useAppSelector } from 'hooks';

type MarketStatsProps = {
  market: Market;
};

function MarketStats({ market }: MarketStatsProps) {
  const currency = useAppSelector(state => state.market.market.currency);
  const { symbol } = currency;
  const outcomeStats = market.outcomes.map(outcome => {
    const chartData = outcome.priceCharts?.find(
      chart => chart.timeframe === '7d'
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
    <div className="pm-p-market__stats">
      {outcomeStats.map(outcomeStat => (
        <Card
          className="pm-p-market__stats-item"
          size="lg"
          key={outcomeStat.title}
          title={
            <Text
              as="label"
              scale="tiny-uppercase"
              fontWeight="bold"
              color="gray"
            >
              {outcomeStat.title}
            </Text>
          }
        >
          <Text
            as="p"
            scale="body"
            fontWeight="semibold"
            color={outcomeStat.changeColor as any}
          >
            {`${roundNumber(outcomeStat.price, 3)} ${symbol}`}
          </Text>
        </Card>
      ))}
      <Card
        className="pm-p-market__stats-item"
        size="lg"
        title={
          <Text
            as="label"
            scale="tiny-uppercase"
            fontWeight="bold"
            color="gray"
          >
            State
          </Text>
        }
      >
        <Text
          as="p"
          scale="body"
          fontWeight="semibold"
          className="pm-p-market__stats-item__price"
        >
          {market.state.toUpperCase()}
        </Text>
      </Card>
    </div>
  );
}

export default MarketStats;
