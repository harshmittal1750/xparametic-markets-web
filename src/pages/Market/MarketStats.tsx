import { roundNumber } from 'helpers/math';
import { uniqueId } from 'lodash';
import type { Market } from 'models/market';

import { Card, Text } from 'components';

export default function MarketStats({
  currency,
  outcomes,
  state,
  title
}: Pick<Market, 'outcomes' | 'currency' | 'state' | 'title'>) {
  return (
    <div className="pm-p-market__stats">
      {outcomes.map(outcome => {
        const key = uniqueId();
        const chartData =
          outcome.priceCharts?.find(chart => chart.timeframe === '7d')
            ?.changePercent ?? 0;

        return (
          <Card
            className="pm-p-market__stats-item"
            size="lg"
            key={title + outcome.title || key}
            title={
              <Text
                as="label"
                scale="tiny-uppercase"
                fontWeight="bold"
                color="gray"
              >
                {outcome.title}
              </Text>
            }
          >
            <Text
              as="p"
              scale="body"
              fontWeight="semibold"
              color={chartData >= 0 ? 'success' : 'danger'}
            >
              {roundNumber(outcome.price, 3)} {currency.symbol}
            </Text>
          </Card>
        );
      })}
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
          {state.toUpperCase()}
        </Text>
      </Card>
    </div>
  );
}
