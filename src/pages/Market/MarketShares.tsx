import { useCallback, useMemo } from 'react';

import { roundNumber } from 'helpers/math';
import isEmpty from 'lodash/isEmpty';
import { changeTradeType, selectOutcome } from 'redux/ducks/trade';

import { Button } from 'components';

import { useAppDispatch, useAppSelector } from 'hooks';

import styles from './MarketShares.module.scss';

type MarketSharesProps = {
  onSellSelected?: () => void;
};

function MarketShares({ onSellSelected }: MarketSharesProps) {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector(state => state.trade);
  const { id, outcomes, networkId } = useAppSelector(
    state => state.market.market
  );
  const portfolio = useAppSelector(state => state.polkamarkets.portfolio);
  const { portfolio: isLoadingPortfolio } = useAppSelector(
    state => state.polkamarkets.isLoading
  );

  const handleSell = useCallback(
    (outcomeId: string) => {
      if (onSellSelected) {
        onSellSelected();
      }

      if (type !== 'sell') {
        dispatch(changeTradeType('sell'));
      }

      dispatch(selectOutcome(id, networkId, outcomeId));
    },
    [dispatch, id, networkId, onSellSelected, type]
  );

  const outcomesWithShares = useMemo(() => {
    if (isLoadingPortfolio) return [];

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
  }, [id, isLoadingPortfolio, outcomes, portfolio]);

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
