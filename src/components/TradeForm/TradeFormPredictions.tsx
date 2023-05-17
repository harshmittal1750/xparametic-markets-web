import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { roundNumber } from 'helpers/math';
import sortOutcomes from 'helpers/sortOutcomes';
import { selectOutcome } from 'redux/ducks/trade';
import { useTheme } from 'ui';

import Icon from 'components/Icon';
import OutcomeItem from 'components/OutcomeItem';
import OutcomeItemText from 'components/OutcomeItemText';

import { useAppDispatch, useAppSelector, useExpandableOutcomes } from 'hooks';

import tradeFormClasses from './TradeForm.module.scss';

export default function TradeFormPredictions() {
  const dispatch = useAppDispatch();
  const trade = useAppSelector(state => state.trade);
  const portfolio = useAppSelector(state => state.polkamarkets.portfolio);
  const symbol = useAppSelector(state => state.market.market.token.ticker);
  const rawOutcomes = useAppSelector(state => state.market.market.outcomes);
  const theme = useTheme();
  const sortedOutcomes = sortOutcomes({
    outcomes: rawOutcomes,
    timeframe: '7d'
  });
  const expandableOutcomes = useExpandableOutcomes({
    outcomes: sortedOutcomes
  });
  const needExpandOutcomes = sortedOutcomes.length > 3;
  const outcomes =
    theme.device.isDesktop && needExpandOutcomes
      ? expandableOutcomes.onseted
      : sortedOutcomes;
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
        $variant="dashed"
        onClick={expandableOutcomes.expand}
        endAdornment={
          <span style={{ color: 'var(--color-text-secondary)' }}>
            <Icon size="lg" name="Plus" />
          </span>
        }
        primary={expandableOutcomes.offseted.primary}
        secondary={expandableOutcomes.offseted.secondary}
      />
    ),
    [expandableOutcomes.expand, expandableOutcomes.offseted]
  );

  return (
    <div className="pm-c-trade-form-predictions">
      {theme.device.isDesktop ? (
        <Virtuoso
          height="100%"
          data={outcomes}
          components={{
            Footer:
              needExpandOutcomes && !expandableOutcomes.isExpanded
                ? Footer
                : undefined
          }}
          itemContent={(index, outcome) => (
            <OutcomeItem
              $size="md"
              $gutterBottom={
                !expandableOutcomes.isExpanded ||
                index !== expandableOutcomes.onseted.length - 1
              }
              percent={+outcome.price * 100}
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
              shares={roundNumber(
                portfolio[trade.selectedMarketId]?.outcomes[outcome.id]?.shares,
                3
              )}
            />
          )}
        />
      ) : (
        <ul className={tradeFormClasses.horizontal}>
          {outcomes.map(outcome => (
            <li key={outcome.title} className={tradeFormClasses.horizontalItem}>
              <OutcomeItem
                $size="md"
                percent={+outcome.price * 100}
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
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
