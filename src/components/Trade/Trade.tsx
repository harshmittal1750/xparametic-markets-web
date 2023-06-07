import cn from 'classnames';

import styles from './Trade.module.scss';
import type { View } from './Trade.types';

type TradeProps = {
  view?: View;
};

function Trade({ view = 'default' }: TradeProps) {
  return (
    <div
      className={cn(styles.root, {
        [styles.rootDefault]: view === 'default',
        [styles.rootModal]: view === 'modal'
      })}
    >
      {view === 'default' ? (
        <p className={styles.rootDefaultTitle}>Make your prediction</p>
      ) : null}

      <p className={styles.terms}>
        By clicking you’re agreeing to our{' '}
        <a
          href="https://www.polkamarkets.com/legal/terms-conditions"
          target="_blank"
          rel="noreferrer"
        >
          Terms and Conditions
        </a>
      </p>
    </div>
  );
}

export default Trade;
