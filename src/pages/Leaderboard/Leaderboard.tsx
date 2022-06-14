import { useState } from 'react';

import { useGetLeaderboardByTimeframeQuery } from 'services/Polkamarkets';

import { Tabs } from 'components';
import { Dropdown } from 'components/new';

import { useNetwork } from 'hooks';

import LeaderboardTable from './LeaderboardTable';
import LeaderboardTopWallets from './LeaderboardTopWallets';
import LeaderboardYourStats from './LeaderboardYourStats';
import {
  achievementsColumnRender,
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
    render: volumeColumnRender
  },
  { title: 'Markets Created', key: 'marketsCreated', align: 'right' },
  { title: 'Won Predictions', key: 'wonPredictions', align: 'right' },
  {
    title: 'Liquidity Added',
    key: 'liquidityAdded',
    align: 'right',
    render: liquidityColumnRender
  },
  {
    title: 'NFT Achievements',
    key: 'achievements',
    align: 'right',
    render: achievements => achievementsColumnRender(achievements, 'medium')
  },
  { title: 'Rank', key: 'rank', align: 'right', render: rankColumnRender }
];

type Timeframe = '1d' | '1w' | '1m';

function Leaderboard() {
  const { network } = useNetwork();
  const { currency } = network;
  const [activeTab, setActiveTab] = useState('volume');
  const [timeframe, setTimeframe] = useState<Timeframe>('1m');
  const { data, isLoading, isFetching } = useGetLeaderboardByTimeframeQuery({
    timeframe,
    networkId: network.id
  });

  const isLoadingQuery = isLoading || isFetching;
  const ticker = currency.symbol || currency.ticker;

  const userEthAddress = '0x891dA613d26ef051ECA35ea337428c514D271c98';

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
                isLoading={isLoadingQuery}
              />
              <div className="flex-column gap-6 justify-start align-start">
                <LeaderboardYourStats
                  loggedInUser={userEthAddress}
                  rows={data}
                  sortBy={tab.sortBy}
                  ticker={ticker}
                  isLoading={isLoadingQuery}
                />
                <LeaderboardTopWallets
                  rows={data}
                  sortBy={tab.sortBy}
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
