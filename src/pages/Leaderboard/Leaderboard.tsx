import { useState } from 'react';

import { useGetLeaderboardByTimeframeQuery } from 'services/Polkamarkets';

import { Tabs } from 'components';

import { useNetwork } from 'hooks';

import LeaderboardTable from './LeaderboardTable';
import {
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
    align: 'right'
  },
  { title: 'Rank', key: 'rank', align: 'right', render: rankColumnRender }
];

type Timeframe = '1d' | '1w' | '1m';

function Leaderboard() {
  const { network } = useNetwork();
  const { currency } = network;
  const [activeTab, setActiveTab] = useState('volume');
  const [timeframe, setTimeframe] = useState<Timeframe>('1m');
  const { data, isLoading } = useGetLeaderboardByTimeframeQuery({
    timeframe,
    networkId: network.id
  });

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
            columns={columns}
            rows={data}
            sortBy="volume"
            currency={currency.ticker}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Markets created" id="marketsCreated">
          <LeaderboardTable
            columns={columns}
            rows={data}
            sortBy="marketsCreated"
            currency={currency.ticker}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Won predictions" id="wonPredictions">
          <LeaderboardTable
            columns={columns}
            rows={data}
            sortBy="claimWinningsCount"
            currency={currency.ticker}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Liquidity added" id="liquidityAdded">
          <LeaderboardTable
            columns={columns}
            rows={data}
            sortBy="liquidity"
            currency={currency.ticker}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Leaderboard;
