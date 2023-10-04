import { Link } from 'react-router-dom';

import cn from 'classnames';
import { isNull, isEmpty } from 'lodash';
import { Tournament } from 'types/tournament';
import { useTheme } from 'ui';

import { AlertMini } from 'components';

import styles from './LeaderboardMarkets.module.scss';

type LeaderboardMarketsProps = {
  data?: Tournament['markets'];
  isLoading: boolean;
  emptyDataDescription?: string;
};

function LeaderboardMarkets({
  data,
  isLoading,
  emptyDataDescription = 'No data to show.'
}: LeaderboardMarketsProps) {
  const theme = useTheme();

  const isEmptyData = isEmpty(data);

  return (
    <div
      className={cn(
        'pm-c-leaderboard-stats bg-3 border-radius-medium border-solid border-1',
        {
          'width-full': !theme.device.isDesktop
        }
      )}
    >
      <h2 className="body semibold text-1">Markets</h2>
      {isLoading ? (
        <div className="flex-row justify-center align-center width-full padding-y-5 padding-x-4">
          <span className="spinner--primary" />
        </div>
      ) : null}
      {!isLoading && isEmptyData ? (
        <AlertMini
          style={{ border: 'none' }}
          styles="outline"
          variant="information"
          description={emptyDataDescription}
        />
      ) : null}
      {!isLoading && !isEmptyData ? (
        <ul className={styles.root}>
          {data?.map(market => (
            <li key={market.slug}>
              <Link className={styles.market} to={`/markets/${market.slug}`}>
                {!isNull(market.imageUrl) && (
                  <img
                    className={styles.marketImage}
                    src={market.imageUrl}
                    alt={market.title}
                  />
                )}
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

export default LeaderboardMarkets;
