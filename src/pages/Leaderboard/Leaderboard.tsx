import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { closeRightSidebar } from 'redux/ducks/ui';
import {
  useGetLeaderboardByTimeframeQuery,
  useGetLeaderboardGroupBySlugQuery
} from 'services/Polkamarkets';
import { useMedia } from 'ui';

import { CreateLeaderboardGroup, Link, SEO, Tabs } from 'components';
import { Dropdown } from 'components/new';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';
import { IFL } from 'hooks/useNetwork/currencies';

import {
  emptyLeaderboardRowWithoutUser,
  sanitizePreviousCreateLeaderboardFormValues
} from './Leaderboard.util';
import LeaderboardMyLeaderboards from './LeaderboardMyLeaderboards';
import LeaderboardTable from './LeaderboardTable';
import LeaderboardTopWallets from './LeaderboardTopWallets';
import LeaderboardYourStats from './LeaderboardYourStats';
import {
  balanceColumnRender,
  // liquidityColumnRender,
  rankColumnRender,
  volumeColumnRender,
  walletColumnRender
} from './prepare';
import type {
  LeaderboardTableColumn,
  CreateLeaderboardGroupState
} from './types';

const IFL_META_LEADERBOARD = `${process.env.PUBLIC_URL}/ifl_meta_leaderboard.png`;

const tabs = [
  {
    id: 'volume',
    title: 'Volume',
    sortBy: 'volume'
  },
  // {
  //   id: 'marketsCreated',
  //   title: 'Markets Created',
  //   sortBy: 'marketsCreated'
  // },
  {
    id: 'wonPredictions',
    title: 'Won Predictions',
    sortBy: 'claimWinningsCount'
  },
  // {
  //   id: 'transactions',
  //   title: 'Transactions',
  //   sortBy: 'transactions'
  // },
  {
    id: 'balance',
    title: 'Balance',
    sortBy: 'erc20Balance'
  }
  // {
  //   id: 'netVolume',
  //   title: 'Net Volume',
  //   sortBy: 'tvlVolume'
  // }
  // {
  //   id: 'netLiquidity',
  //   title: 'Net Liquidity',
  //   sortBy: 'tvlLiquidity'
  // }
];

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
  // {
  //   title: 'Markets Created',
  //   key: 'marketsCreated',
  //   align: 'right',
  //   width: 140
  // },
  {
    title: 'Won Predictions',
    key: 'wonPredictions',
    align: 'right',
    width: 140
  },
  // {
  //   title: 'Transactions',
  //   key: 'transactions',
  //   align: 'right',
  //   width: 140
  // },
  {
    title: 'Balance',
    key: 'balance',
    align: 'right',
    width: 140,
    render: balanceColumnRender
  },
  // {
  //   title: 'Net Volume',
  //   key: 'netVolume',
  //   align: 'right',
  //   width: 140,
  //   render: volumeColumnRender
  // },
  // {
  //   title: 'Net Liquidity',
  //   key: 'netLiquidity',
  //   align: 'right',
  //   width: 140,
  //   render: liquidityColumnRender
  // },
  {
    title: 'Rank',
    key: 'rank',
    align: 'right',
    width: 100,
    render: rankColumnRender
  }
];

type LeaderboardURLParams = {
  slug?: string;
};

type Timeframe = '1w' | '1m' | 'at';

function Leaderboard() {
  const { slug } = useParams<LeaderboardURLParams>();
  const isDesktop = useMedia('(min-width: 1024px)');

  // Redux selectors
  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);
  const rightSidebarIsVisible = useAppSelector(
    state => state.ui.rightSidebar.visible
  );

  // Custom hooks
  const dispatch = useAppDispatch();
  const { network } = useNetwork();
  const currency = IFL;

  // Local state
  const [activeTab, setActiveTab] = useState('wonPredictions');
  const [timeframe, setTimeframe] = useState<Timeframe>('at');

  useEffect(() => {
    if (rightSidebarIsVisible) {
      dispatch(closeRightSidebar());
    }
  }, [rightSidebarIsVisible, dispatch]);

  // Query hooks
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
    isFetching: isFetchingLeaderboardGroup
  } = useGetLeaderboardGroupBySlugQuery(
    {
      slug: slug || ''
    },
    { skip: isLoadingLeaderboardByTimeframeQuery || !slug }
  );

  const isLoadingGetLeaderboardGroupBySlugQuery =
    isLoadingLeaderboardGroup || isFetchingLeaderboardGroup;

  const data = useMemo(() => {
    if (leaderboardByTimeframe && leaderboardGroup) {
      return leaderboardGroup.users.map(user => {
        const userInLeaderboardByTimeframe = leaderboardByTimeframe.find(
          row => row.user === user
        );

        return (
          userInLeaderboardByTimeframe || {
            user,
            ...emptyLeaderboardRowWithoutUser
          }
        );
      });
    }

    if (leaderboardByTimeframe && !isLoadingLeaderboardGroup) {
      return leaderboardByTimeframe;
    }

    return [];
  }, [isLoadingLeaderboardGroup, leaderboardByTimeframe, leaderboardGroup]);

  const isLoadingQuery =
    isLoadingLeaderboardByTimeframeQuery ||
    isLoadingGetLeaderboardGroupBySlugQuery;
  const ticker = currency.symbol || currency.ticker;

  const leaderboardTitle = leaderboardGroup
    ? `${leaderboardGroup.title} - Leaderboard`
    : 'Leaderboard';

  const userEthAddress = walletConnected ? ethAddress : undefined;
  const leaderboardCreatedByUser =
    leaderboardGroup &&
    leaderboardGroup.createdBy.toLowerCase() === ethAddress.toLowerCase();

  const createLeaderboardGroupState: CreateLeaderboardGroupState = {
    enabled: walletConnected,
    mode: leaderboardCreatedByUser ? 'edit' : 'create',
    previousValues: leaderboardCreatedByUser
      ? sanitizePreviousCreateLeaderboardFormValues(leaderboardGroup)
      : undefined,
    slug: leaderboardGroup ? leaderboardGroup.slug : undefined
  };

  const { enabled, mode, previousValues } = createLeaderboardGroupState;

  return (
    <div className="pm-p-leaderboard">
      <SEO
        title="Leaderboard - Illuminate Fantasy League, powered by Polkamarkets"
        description="Rank up higher on the leaderboard and be the #1 forecaster of the Football World Cup. The best global players will earn prizes from the $1500 USD pool, distributed as gift cards."
        imageUrl={IFL_META_LEADERBOARD}
      />
      <div className="pm-p-leaderboard__header">
        <div className="flex-column gap-3">
          <h1 className="heading semibold text-1">{leaderboardTitle}</h1>
          <p className="tiny medium text-2">
            {`Play the IFL with your friends, coworkers and community. `}
            <Link
              title="Learn more"
              scale="tiny"
              fontWeight="medium"
              href="https://ifl.polkamarkets.com/docs/group-leaderboards"
              target="_blank"
            />
          </p>
        </div>
        {enabled ? (
          <CreateLeaderboardGroup
            mode={mode}
            previousValues={previousValues}
            slug={slug}
            disabled={isLoadingQuery}
          />
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
                  isDesktop
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
              {isDesktop ? (
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
    </div>
  );
}

export default Leaderboard;
