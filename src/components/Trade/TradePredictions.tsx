import { useCallback, useMemo, useState, MouseEvent, useEffect } from 'react';

import cn from 'classnames';
import { roundNumber } from 'helpers/math';
import sortOutcomes from 'helpers/sortOutcomes';
import { selectOutcome } from 'redux/ducks/trade';

import { useAppDispatch, useAppSelector } from 'hooks';

import VirtualizedList from '../VirtualizedList';
import styles from './Trade.module.scss';
import { View } from './Trade.types';

type TradePredictionsProps = {
  view: View;
};

function TradePredictions({ view }: TradePredictionsProps) {
  const dispatch = useAppDispatch();
  const [visiblePredictions, setVisiblePredictions] = useState(3);

  const { id, outcomes, networkId } = useAppSelector(
    state => state.market.market
  );

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

  useEffect(() => {
    if (id !== selectedMarketId) {
      dispatch(selectOutcome(id, networkId, predictions[0].id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const multiple = predictions.length > 2;

  const on = multiple ? predictions.slice(0, visiblePredictions) : predictions;
  const off = multiple ? predictions.slice(visiblePredictions) : [];

  const listHeight = Math.min(
    Math.ceil(window.innerHeight * (view === 'modal' ? 0.25 : 0.35)),
    on.length * 49
  );

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
              className={cn(styles.predictionProgress, {
                [styles.predictionProgressDefault]: multiple,
                [styles.predictionProgressWinning]: !multiple && index === 0,
                [styles.predictionProgressLosing]: !multiple && index === 1
              })}
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
      {predictions.length > 3 ? (
        <button
          type="button"
          className={styles.predictionsShowMore}
          onClick={() =>
            setVisiblePredictions(off.length > 0 ? predictions.length : 3)
          }
        >
          {off.length > 0 ? `Show More (${off.length})` : 'Undo'}
        </button>
      ) : null}
    </div>
  );
}

export default TradePredictions;
