import { useState } from 'react';

import cn from 'classnames';

import { useAppSelector } from 'hooks';

import VirtualizedList from '../VirtualizedList';
import styles from './Trade.module.scss';

function TradePredictions() {
  const [visiblePredictions, setVisiblePredictions] = useState(3);

  const outcomes = useAppSelector(state => state.market.market.outcomes);

  const multiple = outcomes.length > 2;

  const on = multiple ? outcomes.slice(0, visiblePredictions) : outcomes;
  const off = multiple ? outcomes.slice(visiblePredictions) : [];

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
              [styles.predictionGutterBottom]: index !== outcomes.length - 1
            })}
          >
            <div
              className={styles.predictionProgress}
              style={{
                width: `${outcome.price * 100}%`
              }}
            />
            <div className={styles.predictionContent}>
              <p className={styles.predictionTitle}>{outcome.title}</p>
              <p className={styles.predictionPrice}>{`${
                outcome.price * 100
              }%`}</p>
            </div>
          </button>
        )}
      />
      <button
        type="button"
        onClick={() =>
          off.length > 0
            ? setVisiblePredictions(outcomes.length)
            : setVisiblePredictions(3)
        }
      >
        {off.length > 0 ? `Show More (${off.length})` : 'Show less'}
      </button>
    </div>
  );
}

export default TradePredictions;
