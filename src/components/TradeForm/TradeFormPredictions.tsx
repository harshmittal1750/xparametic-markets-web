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
  const market = useAppSelector(state => state.market.market);
  const theme = useTheme();
  const sortedOutcomes = sortOutcomes({
    outcomes: market.outcomes,
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
  // TODO: prefer get it i.e. useMarketsColor
  const marketColors = JSON.parse(
    localStorage.getItem('MARKET_COLORS') || '{}'
  );
  const getOutcomeColors = useCallback(
    (id: number) => marketColors[market.network.id][market.id][1][id].join(' '),
    [market.id, market.network.id, marketColors]
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
              image={outcome.imageUrl}
              $gutterBottom={
                !expandableOutcomes.isExpanded ||
                index !== expandableOutcomes.onseted.length - 1
              }
              percent={+outcome.price * 100}
              primary={outcome.title}
              secondary={
                <OutcomeItemText
                  price={outcome.price}
                  symbol={market.token.ticker}
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
              activeColor={getOutcomeColors(+outcome.id)}
            />
          )}
        />
      ) : (
        <ul className={tradeFormClasses.horizontal}>
          {outcomes.map(outcome => (
            <li key={outcome.title} className={tradeFormClasses.horizontalItem}>
              <OutcomeItem
                $size="md"
                image={outcome.imageUrl}
                percent={+outcome.price * 100}
                primary={outcome.title}
                secondary={
                  <OutcomeItemText
                    price={outcome.price}
                    symbol={market.token.ticker}
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
                activeColor={getOutcomeColors(+outcome.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
