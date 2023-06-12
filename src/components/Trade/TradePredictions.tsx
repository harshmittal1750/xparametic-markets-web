import { useCallback, useMemo, useState, MouseEvent } from 'react';

import cn from 'classnames';
import { roundNumber } from 'helpers/math';
import sortOutcomes from 'helpers/sortOutcomes';
import { selectOutcome } from 'redux/ducks/trade';

import { useAppDispatch, useAppSelector } from 'hooks';

import VirtualizedList from '../VirtualizedList';
import styles from './Trade.module.scss';

function TradePredictions() {
  const dispatch = useAppDispatch();
  const [visiblePredictions, setVisiblePredictions] = useState(3);

  const { outcomes } = useAppSelector(state => state.market.market);

  const { selectedOutcomeId, selectedMarketId, selectedMarketNetworkId } =
    useAppSelector(state => state.trade);

  const handleSelectOutcome = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      dispatch(
        selectOutcome(
          selectedMarketId,
          selectedMarketNetworkId,
          +event.currentTarget.value
        )
      );
    },
    [dispatch, selectedMarketId, selectedMarketNetworkId]
  );

  const predictions = useMemo(
    () =>
      sortOutcomes({
        outcomes,
        timeframe: '7d'
      }),
    [outcomes]
  );

  const multiple = predictions.length > 2;

  const on = multiple ? predictions.slice(0, visiblePredictions) : predictions;
  const off = multiple ? predictions.slice(visiblePredictions) : [];

  const listHeight = on.length * 49;

  return (
    <div>
      <VirtualizedList
        height={listHeight}
        data={on}
        itemContent={(index, outcome) => (
          <button
            type="button"
            className={cn(styles.prediction, {
              [styles.predictionGutterBottom]: index !== predictions.length - 1,
              [styles.predictionSelected]:
                outcome.id.toString() === selectedOutcomeId.toString() &&
                outcome.marketId.toString() === selectedMarketId.toString()
            })}
            value={outcome.id.toString()}
            onClick={handleSelectOutcome}
          >
            <div
              className={styles.predictionProgress}
              style={{
                width: `${outcome.price * 100}%`
              }}
            />
            <div className={styles.predictionContent}>
              <p className={styles.predictionTitle}>{outcome.title}</p>
              <p className={styles.predictionPrice}>{`${roundNumber(
                +outcome.price * 100,
                3
              )}%`}</p>
            </div>
          </button>
        )}
      />
      <button
        type="button"
        className={styles.predictionsShowMore}
        onClick={() =>
          off.length > 0
            ? setVisiblePredictions(predictions.length)
            : setVisiblePredictions(3)
        }
      >
        {off.length > 0 ? `Show More (${off.length})` : 'Undo'}
      </button>
    </div>
  );
}

export default TradePredictions;
