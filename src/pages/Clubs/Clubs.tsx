import { Container } from 'ui';

import type { CreateLeaderboardGroupState } from 'pages/Leaderboard/types';

import { CreateLeaderboardGroup, Link } from 'components';

import { useAppSelector } from 'hooks';

import ClubsMyClubs from './ClubsMyClubs';

function Clubs() {
  // Redux selectors
  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  // Derivated data

  // User
  const userEthAddress = walletConnected ? ethAddress : undefined;

  // Features

  // Create/Edit Club
  const createGroupState: CreateLeaderboardGroupState = {
    visible: walletConnected,
    mode: 'create',
    previousValues: undefined,
    slug: undefined
  };

  return (
    <Container className="pm-p-leaderboard max-width-screen-xl">
      <div className="pm-p-leaderboard__header">
        <div className="flex-column gap-3">
          <h1 className="heading semibold text-1">Clubs</h1>
          <p className="tiny medium text-2">
            Compete with your friends, coworkers and community.
          </p>
        </div>
        {createGroupState.visible ? (
          <CreateLeaderboardGroup
            mode={createGroupState.mode}
            previousValues={createGroupState.previousValues}
            slug={createGroupState.slug}
          />
        ) : null}
      </div>
      <ClubsMyClubs loggedInUser={userEthAddress} />
    </Container>
  );
}

export default Clubs;
