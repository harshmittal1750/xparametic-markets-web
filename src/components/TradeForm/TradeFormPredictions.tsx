import { useCallback } from 'react';

import { roundNumber } from 'helpers/math';
import sortOutcomes from 'helpers/sortOutcomes';
import { selectOutcome } from 'redux/ducks/trade';

import OutcomeItem from 'components/OutcomeItem';
import { Area } from 'components/plots';

import { useAppDispatch, useAppSelector } from 'hooks';

import MiniTable from '../MiniTable';

function TradeFormPredictions() {
  const dispatch = useAppDispatch();
  const selectedMarketId = useAppSelector(
    state => state.trade.selectedMarketId
  );
  const selectedMarketNetworkId = useAppSelector(
    state => state.trade.selectedMarketNetworkId
  );
  const selectedOutcomeId = useAppSelector(
    state => state.trade.selectedOutcomeId
  );
  const outcomes = useAppSelector(state => state.market.market.outcomes);
  const symbol = useAppSelector(state => state.market.market.currency.symbol);
  const sortedOutcomes = sortOutcomes({ outcomes, timeframe: 'all' });
  const portfolio = useAppSelector(state => state.polkamarkets.portfolio);
  const handlePredictionClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      dispatch(
        selectOutcome(
          selectedMarketId,
          selectedMarketNetworkId,
          +event.currentTarget.value
        )
      ),
    [dispatch, selectedMarketId, selectedMarketNetworkId]
  );

  return (
    <ol className="pm-c-trade-form-predictions">
      {sortedOutcomes.map(outcome => (
        <li key={outcome.id}>
          <OutcomeItem
            title={outcome.title}
            price={outcome.price.toFixed(3)}
            currency={symbol}
            isActive={
              outcome.id === selectedOutcomeId &&
              outcome.marketId === selectedMarketId
            }
            isPositive={outcome.pricesDiff.sign === 'positive'}
            value={outcome.id}
            onClick={handlePredictionClick}
            chart={
              <Area
                id={`${selectedMarketId}-${outcome.id}-${outcome.title}`}
                data={outcome.data}
                color={outcome.pricesDiff.sign === 'positive' ? 'green' : 'red'}
                width={48}
                height={32}
              />
            }
          >
            <MiniTable
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8
              }}
              rows={[
                {
                  key: 'invested',
                  title: 'invested',
                  value:
                    roundNumber(
                      portfolio[selectedMarketId]?.outcomes[outcome.id]?.shares,
                      3
                    ) || 0
                }
              ]}
            />
          </OutcomeItem>
        </li>
      ))}
    </ol>
  );
}

TradeFormPredictions.displayName = 'TradeFormPredictions';

export default TradeFormPredictions;
