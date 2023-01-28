import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { roundNumber } from 'helpers/math';
import { selectOutcome } from 'redux/ducks/trade';

import Icon from 'components/Icon';
import MiniTable from 'components/MiniTable';
import OutcomeItem from 'components/OutcomeItem';
import Text from 'components/Text';

import { useAppDispatch, useAppSelector, useOutcomes } from 'hooks';

export default function TradeFormPredictions() {
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
  const portfolio = useAppSelector(state => state.polkamarkets.portfolio);
  const symbol = useAppSelector(state => state.market.market.currency.symbol);
  const outcomes = useOutcomes();
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
  const Footer = useCallback(() => {
    return (
      <OutcomeItem
        dense
        onClick={outcomes.expand}
        endAdornment={
          <Icon name="Cross" style={{ transform: 'rotate(45deg)' }} />
        }
        {...outcomes.offseted}
      />
    );
  }, [outcomes.expand, outcomes.offseted]);

  return (
    <div className="pm-c-trade-form-predictions">
      <Virtuoso
        height="100%"
        data={outcomes.onseted}
        components={{
          Footer: outcomes.isExpanded ? undefined : Footer
        }}
        itemContent={(index, outcome) => {
          const price = outcome.price.toFixed(3);
          const isPositive = /^\+/.test(outcome.pricesDiff.value);

          return (
            <OutcomeItem
              $gutterBottom={
                !outcomes.isExpanded || index !== outcomes.onseted.length - 1
              }
              percent={+price * 100}
              dense
              primary={outcome.title}
              secondary={
                <>
                  <Text
                    as="span"
                    scale="tiny"
                    fontWeight="bold"
                    className="pm-c-market-outcomes__item-value"
                  >
                    {price}
                  </Text>{' '}
                  {symbol}
                  <Text as="span" color={isPositive ? 'success' : 'danger'}>
                    <Icon
                      name="Arrow"
                      size="sm"
                      dir={isPositive ? 'up' : 'down'}
                    />
                  </Text>
                </>
              }
              isActive={
                outcome.id === selectedOutcomeId &&
                outcome.marketId === selectedMarketId
              }
              isPositive={isPositive}
              value={outcome.id}
              onClick={handlePredictionClick}
              data={outcome.data}
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
                        portfolio[selectedMarketId]?.outcomes[outcome.id]
                          ?.shares,
                        3
                      ) || 0
                  }
                ]}
              />
            </OutcomeItem>
          );
        }}
      />
    </div>
  );
}
