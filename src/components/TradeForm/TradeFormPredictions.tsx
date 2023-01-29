import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { roundNumber } from 'helpers/math';
import { selectOutcome } from 'redux/ducks/trade';

import Icon from 'components/Icon';
import MiniTable from 'components/MiniTable';
import OutcomeItem from 'components/OutcomeItem';
import OutcomeItemText from 'components/OutcomeItemText';

import { useAppDispatch, useAppSelector, useExpandableOutcomes } from 'hooks';

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
  const outcomes = useAppSelector(state => state.market.market.outcomes);
  const expandableOutcomes = useExpandableOutcomes({
    outcomes,
    max: 2
  });
  const handleOutcomeClick = useCallback(
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
  const Footer = useCallback(
    () => (
      <OutcomeItem
        dense
        onClick={expandableOutcomes.expand}
        endAdornment={
          <Icon name="Cross" style={{ transform: 'rotate(45deg)' }} />
        }
        {...expandableOutcomes.offseted}
      />
    ),
    [expandableOutcomes.expand, expandableOutcomes.offseted]
  );

  return (
    <div className="pm-c-trade-form-predictions">
      <Virtuoso
        height="100%"
        data={expandableOutcomes.onseted}
        components={{
          Footer: expandableOutcomes.isExpanded ? undefined : Footer
        }}
        itemContent={(index, outcome) => {
          const price = outcome.price.toFixed(3);
          const isPositive = /^\+/.test(outcome.pricesDiff.value);

          return (
            <OutcomeItem
              $gutterBottom={
                !expandableOutcomes.isExpanded ||
                index !== expandableOutcomes.onseted.length - 1
              }
              percent={+price * 100}
              dense
              primary={outcome.title}
              secondary={
                <OutcomeItemText
                  price={price}
                  symbol={symbol}
                  isPositive={isPositive}
                />
              }
              isActive={
                outcome.id === selectedOutcomeId &&
                outcome.marketId === selectedMarketId
              }
              isPositive={isPositive}
              value={outcome.id}
              onClick={handleOutcomeClick}
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
