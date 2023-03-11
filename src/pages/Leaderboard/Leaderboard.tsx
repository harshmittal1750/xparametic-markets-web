import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ui } from 'config';
import {
  useGetLeaderboardByTimeframeQuery,
  useGetLeaderboardGroupBySlugQuery,
  useJoinLeaderboardGroupMutation
} from 'services/Polkamarkets';
import { Container, useTheme } from 'ui';

import { CreateLeaderboardGroup, Link, Tabs } from 'components';
import { ButtonLoading } from 'components/Button';
import { Dropdown } from 'components/new';

import { useAppSelector, useNetwork } from 'hooks';

import {
  buildLeaderboardData,
  sanitizePreviousCreateLeaderboardFormValues
} from './Leaderboard.util';
import LeaderboardMyLeaderboards from './LeaderboardMyLeaderboards';
import LeaderboardTable from './LeaderboardTable';
import LeaderboardTopWallets from './LeaderboardTopWallets';
import LeaderboardYourStats from './LeaderboardYourStats';
import {
  balanceColumnRender,
  liquidityColumnRender,
  rankColumnRender,
  volumeColumnRender,
  walletColumnRender
} from './prepare';
import type {
  LeaderboardTableColumn,
  CreateLeaderboardGroupState
} from './types';

const tabs = [
  {
    id: 'volume',
    title: 'Volume',
    sortBy: 'volume'
  },
  {
    id: 'marketsCreated',
    title: 'Markets Created',
    sortBy: 'marketsCreated'
  },
  {
    id: 'wonPredictions',
    title: 'Won Predictions',
    sortBy: 'claimWinningsCount'
  },
  {
    id: 'transactions',
    title: 'Transactions',
    sortBy: 'transactions'
  },
  {
    id: 'balance',
    title: 'Balance',
    sortBy: 'erc20Balance'
  },
  {
    id: 'netVolume',
    title: 'Net Volume',
    sortBy: 'tvlVolume'
  },
  {
    id: 'netLiquidity',
    title: 'Net Liquidity',
    sortBy: 'tvlLiquidity'
  }
].filter(tab => ui.leaderboard.columns.includes(tab.id));

const columns: LeaderboardTableColumn[] = [
  {
    title: 'Wallet',
    key: 'wallet',
    align: 'left',
    width: 200,
    render: walletColumnRender
  },
  {
    title: 'Volume',
    key: 'volume',
    align: 'right',
    width: 140,
    render: volumeColumnRender
  },
  {
    title: 'Markets Created',
    key: 'marketsCreated',
    align: 'right',
    width: 140
  },
  {
    title: 'Won Predictions',
    key: 'wonPredictions',
    align: 'right',
    width: 140
  },
  {
    title: 'Transactions',
    key: 'transactions',
    align: 'right',
    width: 140
  },
  {
    title: 'Balance',
    key: 'balance',
    align: 'right',
    width: 140,
    render: balanceColumnRender
  },
  {
    title: 'Net Volume',
    key: 'netVolume',
    align: 'right',
    width: 140,
    render: volumeColumnRender
  },
  {
    title: 'Net Liquidity',
    key: 'netLiquidity',
    align: 'right',
    width: 140,
    render: liquidityColumnRender
  },
  {
    title: 'Rank',
    key: 'rank',
    align: 'right',
    width: 100,
    render: rankColumnRender
  }
].filter(column =>
  ['wallet', 'rank', ...ui.leaderboard.columns].includes(column.key)
) as LeaderboardTableColumn[];

type LeaderboardURLParams = {
  slug?: string;
};

type Timeframe = '1w' | '1m' | 'at';

function Leaderboard() {
  // Custom hooks
  const { slug } = useParams<LeaderboardURLParams>();
  const theme = useTheme();

  const { network } = useNetwork();

  const { currency } = network;

  // Redux selectors
  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  // Local state
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [timeframe, setTimeframe] = useState<Timeframe>('at');

  // Queries
  const {
    data: leaderboardByTimeframe,
    isLoading: isLoadingLeaderboardByTimeframe,
    isFetching: isFetchingLeaderboardByTimeframe
  } = useGetLeaderboardByTimeframeQuery({
    timeframe,
    networkId: network.id
  });

  const isLoadingLeaderboardByTimeframeQuery =
    isLoadingLeaderboardByTimeframe || isFetchingLeaderboardByTimeframe;

  const {
    data: leaderboardGroup,
    isLoading: isLoadingLeaderboardGroup,
    isFetching: isFetchingLeaderboardGroup,
    refetch: refetchLeaderboardGroup
  } = useGetLeaderboardGroupBySlugQuery(
    {
      slug: slug || ''
    },
    { skip: isLoadingLeaderboardByTimeframeQuery || !slug }
  );

  const isLoadingGetLeaderboardGroupBySlugQuery =
    isLoadingLeaderboardGroup || isFetchingLeaderboardGroup;

  // Mutations
  const [joinLeaderboard, { isLoading: isLoadingJoinLeaderboardGroup }] =
    useJoinLeaderboardGroupMutation();

  const isLoadingJoinLeaderboardGroupMutation = isLoadingJoinLeaderboardGroup;

  // Loading state

  const isLoadingQuery =
    isLoadingLeaderboardByTimeframeQuery ||
    isLoadingGetLeaderboardGroupBySlugQuery;

  // Derivated data

  // Leaderboard
  const leaderboardTitle = leaderboardGroup
    ? leaderboardGroup.title
    : 'Leaderboard';

  const data = useMemo(
    () =>
      buildLeaderboardData(
        isLoadingLeaderboardGroup,
        leaderboardGroup,
        leaderboardByTimeframe
      ),
    [isLoadingLeaderboardGroup, leaderboardGroup, leaderboardByTimeframe]
  );

  // Currency
  const ticker = currency.symbol || currency.ticker;

  // Users
  const usersInLeaderboard = useMemo(() => data.map(row => row.user), [data]);

  // User
  const userEthAddress = walletConnected ? ethAddress : undefined;

  const userInLeaderboard = useMemo(
    () =>
      userEthAddress ? usersInLeaderboard.includes(userEthAddress) : false,
    [userEthAddress, usersInLeaderboard]
  );

  const leaderboardCreatedByUser =
    leaderboardGroup &&
    leaderboardGroup.createdBy.toLowerCase() === ethAddress.toLowerCase();

  // Features

  // Join leaderboard
  const joinGroupState = {
    visible: !!leaderboardGroup,
    disabled:
      !walletConnected ||
      userInLeaderboard ||
      isLoadingGetLeaderboardGroupBySlugQuery,
    joined: userInLeaderboard
  };

  // Create/Edit leaderboard
  const createGroupState: CreateLeaderboardGroupState = {
    visible: walletConnected,
    mode: leaderboardCreatedByUser ? 'edit' : 'create',
    previousValues: leaderboardCreatedByUser
      ? sanitizePreviousCreateLeaderboardFormValues(leaderboardGroup)
      : undefined,
    slug: leaderboardGroup ? leaderboardGroup.slug : undefined
  };

  // Handlers

  const handleJoinLeaderboardGroup = useCallback(async () => {
    if (leaderboardGroup && userEthAddress) {
      await joinLeaderboard({
        slug: leaderboardGroup.slug,
        user: userEthAddress
      });

      await refetchLeaderboardGroup();
    }
  }, [
    joinLeaderboard,
    leaderboardGroup,
    refetchLeaderboardGroup,
    userEthAddress
  ]);

  return (
    <Container className="pm-p-leaderboard">
      <div className="pm-p-leaderboard__header">
        <div className="flex-row gap-5 align-center">
          {leaderboardGroup?.imageUrl ? (
            <img
              className="pm-p-leaderboard__avatar"
              alt={leaderboardGroup.title}
              src={leaderboardGroup.imageUrl}
              width={64}
              height={64}
            />
          ) : null}
          <div className="flex-column gap-3">
            <div className="flex-row gap-5 align-center">
              <h1 className="heading semibold text-1">{leaderboardTitle}</h1>
              {createGroupState.visible && createGroupState.mode === 'edit' ? (
                <CreateLeaderboardGroup
                  mode={createGroupState.mode}
                  previousValues={createGroupState.previousValues}
                  slug={slug}
                  disabled={isLoadingQuery}
                  size="xs"
                />
              ) : null}
            </div>
            {ui.clubs.enabled ? (
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
            ) : null}
          </div>
        </div>
        {createGroupState.visible && !joinGroupState.visible ? (
          <CreateLeaderboardGroup
            mode={createGroupState.mode}
            previousValues={createGroupState.previousValues}
            slug={slug}
            disabled={isLoadingQuery}
          />
        ) : null}
        {joinGroupState.visible ? (
          <ButtonLoading
            size="sm"
            color="default"
            onClick={handleJoinLeaderboardGroup}
            loading={isLoadingJoinLeaderboardGroupMutation}
            disabled={joinGroupState.disabled}
          >
            {joinGroupState.joined ? 'Joined' : 'Join Club'}
          </ButtonLoading>
        ) : null}
      </div>
      <Tabs
        direction="row"
        fullwidth
        value={activeTab}
        onChange={tab => setActiveTab(tab)}
        filters={[
          <Dropdown
            key="timeframe"
            defaultOption="at"
            options={[
              { label: 'Weekly', value: '1w' },
              { label: 'Monthly', value: '1m' },
              { label: 'All-time', value: 'at' }
            ]}
            onSelect={value => setTimeframe(value)}
          />
        ]}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.id} id={tab.id} tab={tab.title}>
            <div className="flex-row gap-6 justify-space-between align-start width-full">
              <LeaderboardTable
                loggedInUser={userEthAddress}
                columns={
                  theme.device.type.isDesktop
                    ? columns
                    : columns.filter(
                        column =>
                          column.key === activeTab || column.key === 'wallet'
                      )
                }
                rows={data}
                sortBy={tab.sortBy}
                ticker={ticker}
                isLoading={isLoadingQuery}
              />
              {theme.device.type.isDesktop ? (
                <div className="flex-column gap-6 justify-start align-start">
                  {walletConnected ? (
                    <LeaderboardYourStats
                      loggedInUser={userEthAddress}
                      rows={data}
                      sortBy={tab.sortBy}
                      ticker={ticker}
                      isLoading={isLoadingQuery}
                    />
                  ) : null}
                  <LeaderboardTopWallets
                    rows={data}
                    sortBy={tab.sortBy}
                    isLoading={isLoadingQuery}
                  />
                  {walletConnected ? (
                    <LeaderboardMyLeaderboards loggedInUser={userEthAddress} />
                  ) : null}
                </div>
              ) : null}
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Container>
  );
}

export default Leaderboard;
