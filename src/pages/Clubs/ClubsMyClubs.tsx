import { memo } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useGetLeaderboardGroupsByUserQuery } from 'services/Polkamarkets';
import type { GetLeaderboardGroupsByUserData } from 'services/Polkamarkets/types';

import { AlertMini, Icon } from 'components';

import ClubsMyClubsClasses from './ClubsMyClubs.module.scss';

type LeaderboardMyLeaderboardsProps = {
  loggedInUser?: string;
};

function MyClubs({
  data,
  isLoading
}: {
  data?: GetLeaderboardGroupsByUserData;
  isLoading: boolean;
}) {
  if (isLoading)
    return (
      <div className="flex-row justify-center align-center width-full padding-y-5 padding-x-4">
        <span className="spinner--primary" />
      </div>
    );

  if (isEmpty(data))
    return (
      <AlertMini
        style={{ border: 'none' }}
        styles="outline"
        variant="information"
        description="You don't belong to any Clubs yet. Create a Club, or use the invite link if you have received one"
      />
    );

  return (
    <ul className="flex-column gap-4">
      {data?.map(leaderboard => (
        <li key={leaderboard.slug}>
          <Link
            to={`/clubs/${leaderboard.slug}`}
            className="flex-row gap-3 align-center"
          >
            <div className={ClubsMyClubsClasses.avatar}>
              {leaderboard.imageUrl ? (
                <img
                  src={leaderboard.imageUrl}
                  alt="Club Avatar"
                  className={ClubsMyClubsClasses.image}
                />
              ) : (
                <p
                  className={cn(
                    'body text-3 bold',
                    ClubsMyClubsClasses.initials
                  )}
                >
                  {leaderboard.title.match(/\w/)}
                </p>
              )}
            </div>
            <div>
              <span
                className={cn(
                  ClubsMyClubsClasses.clubTitle,
                  'tiny bold text-3 text-1-on-hover'
                )}
              >
                {leaderboard.admin ? (
                  <>
                    <span className={ClubsMyClubsClasses.adornment}>
                      <Icon name="Crown" />
                    </span>
                    Admin
                  </>
                ) : (
                  'Member'
                )}
              </span>
              <p className="body text-1">{leaderboard.title}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
function LeaderboardMyLeaderboards({
  loggedInUser
}: LeaderboardMyLeaderboardsProps) {
  const leaderboardGroupsByUserQuery = useGetLeaderboardGroupsByUserQuery(
    { user: loggedInUser || '' },
    { skip: !loggedInUser }
  );

  return (
    <div className="pm-c-leaderboard-stats bg-3 border-radius-medium border-solid border-1 width-full">
      <h2 className="body semibold text-1">My Clubs</h2>
      <MyClubs {...leaderboardGroupsByUserQuery} />
    </div>
  );
}

export default memo(LeaderboardMyLeaderboards);
