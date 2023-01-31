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
  const trade = useAppSelector(state => state.trade);
  const portfolio = useAppSelector(state => state.polkamarkets.portfolio);
  const symbol = useAppSelector(state => state.market.market.currency.symbol);
  const outcomes = useAppSelector(state => state.market.market.outcomes);
  const expandableOutcomes = useExpandableOutcomes({
    outcomes
  });
  const handleOutcomeClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(
        selectOutcome(
          trade.selectedMarketId,
          trade.selectedMarketNetworkId,
          +event.currentTarget.value
        )
      );
    },
    [dispatch, trade.selectedMarketId, trade.selectedMarketNetworkId]
  );
  const Footer = useCallback(
    () => (
      <OutcomeItem
        $dense
        $variant="dashed"
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
        itemContent={(index, outcome) => (
          <OutcomeItem
            $gutterBottom={
              !expandableOutcomes.isExpanded ||
              index !== expandableOutcomes.onseted.length - 1
            }
            percent={+outcome.price * 100}
            $dense
            primary={outcome.title}
            secondary={
              <OutcomeItemText
                price={outcome.price}
                symbol={symbol}
                isPositive={outcome.isPriceUp}
              />
            }
            isActive={
              outcome.id === +trade.selectedOutcomeId &&
              outcome.marketId === +trade.selectedMarketId
            }
            isPositive={outcome.isPriceUp}
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
                      portfolio[trade.selectedMarketId]?.outcomes[outcome.id]
                        ?.shares,
                      3
                    ) || 0
                }
              ]}
            />
          </OutcomeItem>
        )}
      />
    </div>
  );
}
