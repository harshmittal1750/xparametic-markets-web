import cn from 'classnames';

import { useAppSelector } from 'hooks';

import Breadcrumb from '../Breadcrumb';
import { Button } from '../Button';
import { views } from './Trade.config';
import styles from './Trade.module.scss';
import type { View } from './Trade.types';

type TradeProps = {
  view?: View;
};

function Trade({ view = 'default' }: TradeProps) {
  const market = useAppSelector(state => state.market.market);

  const config = views[view];

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
      <div className={styles.market}>
        {config.market.categories ? (
          <Breadcrumb>
            <Breadcrumb.Item>{market.category}</Breadcrumb.Item>
            <Breadcrumb.Item>{market.subcategory}</Breadcrumb.Item>
          </Breadcrumb>
        ) : null}
        {config.market.title ? (
          <p className={styles.marketTitle}>{market.title}</p>
        ) : null}
      </div>
      <Button size="sm" color="primary">
        Predict & Win
      </Button>
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
