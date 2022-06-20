import { useState } from 'react';

import { useGetLeaderboardByTimeframeQuery } from 'services/Polkamarkets';

import { Tabs } from 'components';
import { Dropdown } from 'components/new';

import { useAppSelector, useNetwork } from 'hooks';

import LeaderboardTable from './LeaderboardTable';
import LeaderboardTopWallets from './LeaderboardTopWallets';
import LeaderboardYourStats from './LeaderboardYourStats';
import {
  liquidityColumnRender,
  rankColumnRender,
  volumeColumnRender,
  walletColumnRender
} from './prepare';
import { LeaderboardTableColumn } from './types';

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
    id: 'liquidityAdded',
    title: 'Liquidity Added',
    sortBy: 'liquidity'
  }
];

const columns: LeaderboardTableColumn[] = [
  { title: 'Wallet', key: 'wallet', align: 'left', render: walletColumnRender },
  {
    title: 'Volume',
    key: 'volume',
    align: 'right',
    width: 180,
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
    title: 'Liquidity Added',
    key: 'liquidityAdded',
    align: 'right',
    width: 180,
    render: liquidityColumnRender
  },
  {
    title: 'Rank',
    key: 'rank',
    align: 'right',
    width: 100,
    render: rankColumnRender
  }
];

type Timeframe = '1d' | '1w' | '1m';

function Leaderboard() {
  // Redux selectors
  const walletConnected = useAppSelector(state => state.bepro.isLoggedIn);
  const ethAddress = useAppSelector(state => state.bepro.ethAddress);

  // Custom hooks
  const { network } = useNetwork();
  const { currency } = network;

  // Local state
  const [activeTab, setActiveTab] = useState('volume');
  const [timeframe, setTimeframe] = useState<Timeframe>('1m');

  // Query hooks
  const { data, isLoading, isFetching } = useGetLeaderboardByTimeframeQuery({
    timeframe,
    networkId: network.id
  });

  const userEthAddress = walletConnected ? ethAddress : undefined;

  const isLoadingQuery = isLoading || isFetching;
  const ticker = currency.symbol || currency.ticker;

  return (
    <div className="pm-p-leaderboard">
      <h1 className="heading semibold text-1">Leaderboard</h1>
      <Tabs
        direction="row"
        fullwidth
        value={activeTab}
        onChange={tab => setActiveTab(tab)}
        filters={[
          <Dropdown
            key="timeframe"
            defaultOption="1m"
            options={[
              { label: 'Daily leaderboard', value: '1d' },
              { label: 'Weekly leaderboard', value: '1w' },
              { label: 'Monthly leaderboard', value: '1m' }
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
                columns={columns}
                rows={data}
                sortBy={tab.sortBy}
                ticker={ticker}
                explorerURL={network.explorerURL}
                isLoading={isLoadingQuery}
              />
              <div className="flex-column gap-6 justify-start align-start">
                <LeaderboardYourStats
                  loggedInUser={userEthAddress}
                  rows={data}
                  sortBy={tab.sortBy}
                  ticker={ticker}
                  explorerURL={network.explorerURL}
                  isLoading={isLoadingQuery}
                />
                <LeaderboardTopWallets
                  rows={data}
                  sortBy={tab.sortBy}
                  explorerURL={network.explorerURL}
                  isLoading={isLoadingQuery}
                />
              </div>
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default Leaderboard;
