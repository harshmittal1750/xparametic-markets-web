import { useCallback, useMemo } from 'react';

import { roundNumber } from 'helpers/math';
import isEmpty from 'lodash/isEmpty';
import { changeTradeType, selectOutcome } from 'redux/ducks/trade';

import { Button } from 'components';

import { useAppDispatch, useAppSelector } from 'hooks';

import styles from './MarketShares.module.scss';

function MarketShares() {
  const dispatch = useAppDispatch();
  const { type, selectedMarketId, selectedMarketNetworkId, selectedOutcomeId } =
    useAppSelector(state => state.trade);
  const { id, outcomes } = useAppSelector(state => state.market.market);
  const portfolio = useAppSelector(state => state.polkamarkets.portfolio);

  const handleSell = useCallback(
    (outcomeId: string) => {
      if (type !== 'sell') {
        dispatch(changeTradeType('sell'));
      }

      if (selectedOutcomeId !== outcomeId) {
        dispatch(
          selectOutcome(selectedMarketId, selectedMarketNetworkId, outcomeId)
        );
      }
    },
    [
      dispatch,
      selectedMarketId,
      selectedMarketNetworkId,
      selectedOutcomeId,
      type
    ]
  );

  const outcomesWithShares = useMemo(() => {
    const marketShares = portfolio[id];

    if (!marketShares) return [];

    const sharesByOutcome = outcomes.map(outcome => {
      const outcomeShares = marketShares.outcomes[outcome.id];

      return {
        id: outcome.id.toString(),
        title: outcome.title,
        shares: outcomeShares ? outcomeShares.shares : 0
      };
    });

    return sharesByOutcome.filter(outcome => outcome.shares > 0);
  }, [id, outcomes, portfolio]);

  if (isEmpty(outcomesWithShares)) return null;

  return (
    <ul className={styles.root}>
      {outcomesWithShares.map(outcome => (
        <li key={outcome.id} className={styles.rootItem}>
          <p className={styles.rootItemDescription}>
            You currently hold{' '}
            <strong>{`${roundNumber(outcome.shares, 3)}`} Shares</strong> of{' '}
            <strong>{outcome.title}</strong>
          </p>
          <Button size="sm" onClick={() => handleSell(outcome.id)}>
            Sell Shares
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default MarketShares;
