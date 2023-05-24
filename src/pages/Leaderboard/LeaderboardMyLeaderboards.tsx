import { memo } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useGetLeaderboardGroupsByUserQuery } from 'services/Polkamarkets';

import { CrownIcon } from 'assets/icons';

import { AlertMini } from 'components';

import LeaderboardMyLeaderboardsClasses from './LeaderboardMyLeaderboards.module.scss';

type LeaderboardMyLeaderboardsProps = {
  loggedInUser?: string;
};

function LeaderboardMyLeaderboards({
  loggedInUser
}: LeaderboardMyLeaderboardsProps) {
  const { data, isLoading } = useGetLeaderboardGroupsByUserQuery(
    {
      user: loggedInUser || ''
    },
    { skip: !loggedInUser }
  );

  return (
    <div className="pm-c-leaderboard-stats bg-3 border-radius-medium border-solid border-1">
      <h2 className="body semibold text-1">My Clubs</h2>
      {isLoading ? (
        <div className="flex-row justify-center align-center width-full padding-y-5 padding-x-4">
          <span className="spinner--primary" />
        </div>
      ) : null}
      {!isLoading && isEmpty(data) ? (
        <AlertMini
          style={{ border: 'none' }}
          styles="outline"
          variant="information"
          description="You don't belong to any club."
        />
      ) : null}
      {!isLoading && !isEmpty(data) ? (
        <ul className="flex-column gap-4">
          {data?.map(leaderboard => (
            <li key={leaderboard.slug} className="flex-row gap-3 align-center">
              {leaderboard.admin ? <CrownIcon /> : null}
              <Link
                className={cn(
                  LeaderboardMyLeaderboardsClasses.leaderboardTitle,
                  'tiny-uppercase',
                  'bold',
                  'text-3',
                  'text-1-on-hover'
                )}
                to={`/clubs/${leaderboard.slug}`}
              >
                {leaderboard.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default memo(LeaderboardMyLeaderboards);
