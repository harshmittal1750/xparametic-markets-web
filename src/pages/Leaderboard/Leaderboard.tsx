import { useState } from 'react';

import { useGetLeaderboardByTimeframeQuery } from 'services/Polkamarkets';

import { Tabs } from 'components';

import { useNetwork } from 'hooks';

import LeaderboardTable from './LeaderboardTable';
import {
  achievementsColumnRender,
  rankColumnRender,
  volumeColumnRender,
  walletColumnRender
} from './prepare';
import { LeaderboardTableColumn } from './types';

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
  { title: 'Liquidity Added', key: 'liquidityAdded', align: 'right' },
  {
    title: 'NFT Achievements',
    key: 'achievements',
    align: 'right',
    render: achievementsColumnRender
  },
  { title: 'Rank', key: 'rank', align: 'right', render: rankColumnRender }
];

type Timeframe = '1d' | '1w' | '1m';

function Leaderboard() {
  const { network } = useNetwork();
  const { currency } = network;
  const { symbol, ticker } = currency;
  const [activeTab, setActiveTab] = useState('volume');
  const [timeframe, setTimeframe] = useState<Timeframe>('1m');
  const { data, isLoading } = useGetLeaderboardByTimeframeQuery({
    timeframe,
    networkId: network.id
  });

  const userEthAddress = '0x891dA613d26ef051ECA35ea337428c514D271c98';

  return (
    <div className="pm-p-leaderboard">
      <h1 className="heading semibold text-1">Leaderboard</h1>
      <Tabs
        direction="row"
        fullwidth
        value={activeTab}
        onChange={tab => setActiveTab(tab)}
      >
        <Tabs.TabPane tab="Volume" id="volume">
          <LeaderboardTable
            loggedInUser={userEthAddress}
            columns={columns}
            rows={data}
            sortBy="volume"
            ticker={symbol || ticker}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Markets created" id="marketsCreated">
          <LeaderboardTable
            loggedInUser={userEthAddress}
            columns={columns}
            rows={data}
            sortBy="marketsCreated"
            ticker={symbol || ticker}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Won predictions" id="wonPredictions">
          <LeaderboardTable
            loggedInUser={userEthAddress}
            columns={columns}
            rows={data}
            sortBy="claimWinningsCount"
            ticker={symbol || ticker}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Liquidity added" id="liquidityAdded">
          <LeaderboardTable
            loggedInUser={userEthAddress}
            columns={columns}
            rows={data}
            sortBy="liquidity"
            ticker={symbol || ticker}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Leaderboard;
