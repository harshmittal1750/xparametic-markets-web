import { memo } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useGetLeaderboardGroupsByUserQuery } from 'services/Polkamarkets';

import { AlertMini, Icon } from 'components';

import ClubsMyClubsClasses from './ClubsMyClubs.module.scss';

type LeaderboardMyLeaderboardsProps = {
  loggedInUser?: string;
};

function LeaderboardMyLeaderboards({
  loggedInUser
}: LeaderboardMyLeaderboardsProps) {
  const { data, isLoading } = useGetLeaderboardGroupsByUserQuery(
    { user: loggedInUser || '' },
    { skip: !loggedInUser }
  );
  const renderList = isEmpty(data) ? (
    <AlertMini
      style={{ border: 'none' }}
      styles="outline"
      variant="information"
      description="You don't belong to any Clubs yet. Create a Club, or use the invite link if you have received one"
    />
  ) : (
    <ul className="flex-column gap-4">
      {data?.map(leaderboard => (
        <li key={leaderboard.slug}>
          <Link
            to={`/clubs/${leaderboard.slug}`}
            className="flex-row gap-3 align-center"
          >
            <div className={ClubsMyClubsClasses.avatar} />
            <div>
              <p className="body text-1">{leaderboard.title}</p>
              <span
                className={cn(
                  ClubsMyClubsClasses.clubTitle,
                  'tiny bold text-3 text-1-on-hover'
                )}
              >
                {leaderboard.admin ? (
                  <>
                    <Icon name="Crown" className={ClubsMyClubsClasses.icon} />
                    Admin
                  </>
                ) : (
                  'Member'
                )}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="pm-c-leaderboard-stats bg-3 border-radius-medium border-solid border-1 width-full">
      <h2 className="body semibold text-1">My Clubs</h2>
      {isLoading ? (
        <div className="flex-row justify-center align-center width-full padding-y-5 padding-x-4">
          <span className="spinner--primary" />
        </div>
      ) : (
        renderList
      )}
    </div>
  );
}

export default memo(LeaderboardMyLeaderboards);
