import { CSSProperties } from 'react';

import cn from 'classnames';
import { useTheme } from 'ui';

import { useAppSelector } from 'hooks';

import Breadcrumb from '../Breadcrumb';
import { Button } from '../Button';
import TradeFormClosed from '../TradeForm/TradeFormClosed';
import TradeFormInput from '../TradeForm/TradeFormInput';
import { views } from './Trade.config';
import styles from './Trade.module.scss';
import type { View } from './Trade.types';
import TradeDetails from './TradeDetails';
import TradePredictions from './TradePredictions';

type TradeProps = {
  view?: View;
};

function Trade({ view = 'default' }: TradeProps) {
  const theme = useTheme();
  const market = useAppSelector(state => state.market.market);
  const colors = useAppSelector(state => state.ui.market.colors);

  const isLoadingMarket = useAppSelector(state => state.market.isLoading);

  const config = views[view];

  if (isLoadingMarket) return null;

  if (market.state !== 'open') return <TradeFormClosed />;

  return (
    <div
      className={cn(styles.root, {
        [styles.rootDefault]: view === 'default',
        [styles.rootModal]: view === 'modal'
      })}
      style={
        {
          '--image': `url('${market.imageUrl}')`,
          '--backdrop-color': colors[market.id]
        } as CSSProperties
      }
    >
      {view === 'default' && theme.device.isDesktop ? (
        <p className={styles.rootDefaultTitle}>Make your prediction</p>
      ) : null}
      {config.market.details ? (
        <div className={styles.market}>
          <Breadcrumb>
            <Breadcrumb.Item>{market.category}</Breadcrumb.Item>
            <Breadcrumb.Item>{market.subcategory}</Breadcrumb.Item>
          </Breadcrumb>
          <p className={styles.marketTitle}>{market.title}</p>
        </div>
      ) : null}
      <TradePredictions view={view} />
      <TradeFormInput />
      <TradeDetails />
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
