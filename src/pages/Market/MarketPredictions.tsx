import { useCallback, useState } from 'react';

import { reset } from 'redux/ducks/trade';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalHeaderHide,
  ModalHeaderTitle,
  Trade
} from 'components';
import { TradePredictions } from 'components/Trade';

import { useAppDispatch } from 'hooks';

import styles from './Market.module.scss';
import MarketShares from './MarketShares';

function MarketPredictions() {
  const dispatch = useAppDispatch();
  const [tradeVisible, setTradeVisible] = useState(false);

  const handleCloseTrade = useCallback(() => {
    dispatch(reset());
    setTradeVisible(false);
  }, [dispatch]);

  const handlePredictionSelected = useCallback(() => {
    if (tradeVisible) return;
    setTradeVisible(true);
  }, [tradeVisible]);

  return (
    <>
      <MarketShares onSellSelected={handlePredictionSelected} />
      <div className={styles.predictions}>
        <p className={styles.predictionsTitle}>Select your prediction</p>
        <TradePredictions
          view="default"
          size="lg"
          onPredictionSelected={handlePredictionSelected}
        />
        <Modal show={tradeVisible} centered>
          <ModalContent className={styles.tradeModalContent}>
            <ModalHeader className={styles.tradeModalHeader}>
              <ModalHeaderHide onClick={handleCloseTrade} />
              <ModalHeaderTitle className={styles.tradeModalHeaderTitle}>
                Make your prediction
              </ModalHeaderTitle>
            </ModalHeader>
            <Trade view="modal" />
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default MarketPredictions;
