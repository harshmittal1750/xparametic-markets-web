import { Link } from 'react-router-dom';

import cn from 'classnames';
import { ui } from 'config';
import isEmpty from 'lodash/isEmpty';
import { useGetMarketsByIdsQuery } from 'services/Polkamarkets';

import { AlertMini } from 'components';

import { useAppSelector, useNetwork } from 'hooks';

import styles from './ResetAccount.module.scss';

type ResetAccountMarketsProps = {
  emptyDataDescription?: string;
};

function ResetAccountMarkets({
  emptyDataDescription = 'No data to show.'
}: ResetAccountMarketsProps) {
  const { network } = useNetwork();

  const { marketsWithActions, marketsWithBonds, isLoading } = useAppSelector(
    state => state.polkamarkets
  );

  const { bonds: isLoadingBonds, actions: isLoadingActions } = isLoading;
  const marketsIds = [...marketsWithActions, ...marketsWithBonds];

  const { data, isLoading: isLoadingMarkets } = useGetMarketsByIdsQuery(
    {
      ids: marketsIds,
      networkId: network.id
    },
    {
      skip:
        (ui.portfolio.tabs.reportPositions.enabled && isLoadingBonds) ||
        isLoadingActions ||
        isEmpty(marketsIds)
    }
  );

  const isEmptyData = isEmpty(data);
  const isLoadingData = isLoadingBonds || isLoadingActions || isLoadingMarkets;

  return (
    <div className="pm-c-leaderboard-stats bg-3 border-radius-medium border-solid border-1 width-full">
      <h2 className="body semibold text-1">Markets</h2>
      {isLoadingData ? (
        <div className="flex-row justify-center align-center width-full padding-y-6 padding-x-5 margin-bottom-6">
          <span className="spinner--primary" />
        </div>
      ) : null}
      {!isLoadingData && isEmptyData ? (
        <AlertMini
          style={{
            padding: '25px 16px 25px 16px',
            marginBottom: 24,
            border: 'none'
          }}
          styles="outline"
          variant="information"
          description={emptyDataDescription}
        />
      ) : null}
      {!isLoadingData && !isEmptyData ? (
        <ul className={styles.markets}>
          {data?.map(market => (
            <li key={market.slug}>
              <Link className={styles.market} to={`/markets/${market.slug}`}>
                <img
                  className={styles.marketImage}
                  src={market.imageUrl}
                  alt={market.title}
                />
                <p
                  className={cn(
                    styles.marketTitle,
                    'caption semibold text-2 text-1-on-hover'
                  )}
                >
                  {market.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default ResetAccountMarkets;
