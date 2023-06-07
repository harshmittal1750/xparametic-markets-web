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
    </div>
  );
}

export default Trade;
