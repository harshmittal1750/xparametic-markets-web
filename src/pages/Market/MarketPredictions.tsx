import { TradePredictions } from 'components/Trade';

import styles from './Market.module.scss';

function MarketPredictions() {
  return (
    <div className={styles.predictions}>
      <p className={styles.predictionsTitle}>Select your prediction</p>
      <TradePredictions view="default" size="lg" />
    </div>
  );
}

export default MarketPredictions;
