import { useEffect } from 'react';

import { closeRightSidebar } from 'redux/ducks/ui';

import type { CreateLeaderboardGroupState } from 'pages/Leaderboard/types';

import { CreateLeaderboardGroup, Link, SEO } from 'components';

import { useAppDispatch, useAppSelector } from 'hooks';

import ClubsMyClubs from './ClubsMyClubs';

const IFL_META_CLUBS = `${process.env.PUBLIC_URL}/ifl_meta_clubs.png`;

function Clubs() {
  // Custom hooks
  const dispatch = useAppDispatch();

  // Redux selectors
  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);
  const rightSidebarIsVisible = useAppSelector(
    state => state.ui.rightSidebar.visible
  );

  useEffect(() => {
    if (rightSidebarIsVisible) {
      dispatch(closeRightSidebar());
    }
  }, [rightSidebarIsVisible, dispatch]);

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
    <div className="pm-p-leaderboard">
      <SEO
        title="Clubs - Illuminate Fantasy League, powered by Polkamarkets"
        description="Build your own Club, league and leaderboard with your friends, against colleagues or around communities. Wear your own logo, tease your clubmates and let all fight to climb the Club's leaderboard."
        imageUrl={IFL_META_CLUBS}
      />
      <div className="pm-p-leaderboard__header">
        <div className="flex-column gap-3">
          <h1 className="heading semibold text-1">Clubs</h1>
          <p className="tiny medium text-2">
            {`Play the IFL with your friends, coworkers and community. `}
            <Link
              title="Learn more"
              scale="tiny"
              fontWeight="medium"
              href="https://ifl.polkamarkets.com/docs/clubs"
              target="_blank"
            />
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
    </div>
  );
}

export default Clubs;
