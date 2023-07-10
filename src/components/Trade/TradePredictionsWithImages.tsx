import { useContext, useCallback, MouseEvent } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import cn from 'classnames';
import { roundNumber } from 'helpers/math';
import { Outcome } from 'models/market';
import { selectOutcome } from 'redux/ducks/trade';
import { Image } from 'ui';

import { useAppDispatch, useAppSelector } from 'hooks';

import Icon from '../Icon';
import styles from './Trade.module.scss';

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <button
      type="button"
      className={styles.predictionsWithImageArrowButton}
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
    >
      <Icon name="Chevron" dir="left" />
    </button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <button
      type="button"
      className={styles.predictionsWithImageArrowButton}
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    >
      <Icon name="Chevron" dir="right" />
    </button>
  );
}

type TradePredictionsWithImagesProps = {
  predictions: Outcome[];
};

function TradePredictionsWithImages({
  predictions
}: TradePredictionsWithImagesProps) {
  const dispatch = useAppDispatch();

  const { id, networkId } = useAppSelector(state => state.market.market);

  const { selectedOutcomeId, selectedMarketId } = useAppSelector(
    state => state.trade
  );

  const handleSelectPrediction = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      dispatch(selectOutcome(id, networkId, +event.currentTarget.value));
    },
    [dispatch, id, networkId]
  );

  return (
    <ScrollMenu
      wrapperClassName={styles.predictionsWithImageWrapper}
      scrollContainerClassName={styles.predictionsWithImageScroll}
      itemClassName={styles.predictionsWithImageItem}
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
    >
      {predictions.map(prediction => (
        <button
          type="button"
          key={prediction.id.toString()}
          itemID={prediction.id.toString()}
          title={prediction.title}
          className={cn(styles.predictionWithImage, {
            [styles.predictionWithImageSelected]:
              prediction.id.toString() === selectedOutcomeId.toString() &&
              prediction.marketId.toString() === selectedMarketId.toString()
          })}
          value={prediction.id.toString()}
          onClick={handleSelectPrediction}
        >
          <Image
            className={styles.predictionWithImageImage}
            alt={prediction.title}
            src={prediction.imageUrl}
          />
          <div className={styles.predictionWithImageDetails}>
            <p className={styles.predictionWithImageDetailsTitle}>
              {prediction.title}
            </p>
            <p
              className={styles.predictionWithImageDetailsPrice}
            >{`${roundNumber(+prediction.price * 100, 3)}%`}</p>
          </div>
        </button>
      ))}
    </ScrollMenu>
  );
}

export default TradePredictionsWithImages;
