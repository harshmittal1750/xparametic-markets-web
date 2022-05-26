import { ReactNode } from 'react';

import { useGetLeaderboardByTimeframeQuery } from 'services/Polkamarkets';

import {
  FirstPlaceIcon,
  SecondPlaceIcon,
  ThirdPlaceIcon,
  RankUpIcon,
  RankDownIcon,
  RankStableIcon,
  MyPlaceIcon
} from 'assets/icons/pages/leaderboard';

import { Tabs } from 'components';
import { Table } from 'components/new';
import { TableColumn } from 'components/new/Table';

import { useNetwork } from 'hooks';

import { prepareLeaderboardTableRows } from './prepare';

type WalletColumnRenderArgs = {
  isCurrentUser: boolean;
  address: string;
  place: number;
};

function walletColumnRender({
  isCurrentUser,
  address,
  place
}: WalletColumnRenderArgs) {
  const walletPlace = {
    1: {
      icon: <FirstPlaceIcon />,
      textColor: 'warning'
    },
    2: {
      icon: <SecondPlaceIcon />,
      textColor: 'violets-are-blue'
    },
    3: {
      icon: <ThirdPlaceIcon />,
      textColor: 'maximum-blue-green'
    }
  }[place] || {
    icon: null,
    textColor: '1'
  };

  return (
    <div className="flex-row gap-4">
      {walletPlace.icon}
      {isCurrentUser ? <MyPlaceIcon /> : null}
      <span
        className={`caption semibold text-${
          isCurrentUser ? '1' : walletPlace.textColor
        }`}
      >
        {`${address.substring(0, 6)}...${address.substring(
          address.length - 4
        )}`}
        {isCurrentUser ? (
          <span className="caption semibold text-3">{` (You)`}</span>
        ) : null}
      </span>
    </div>
  );
}

type VolumeColumnRenderArgs = {
  volume: number;
  ticker: ReactNode;
};

function volumeColumnRender({ volume, ticker }: VolumeColumnRenderArgs) {
  return (
    <span className="caption semibold text-1 whitespace-nowrap">
      {`${volume.toFixed(3)} `}
      {ticker}
    </span>
  );
}

type RankColumnRenderArgs = {
  place: number;
  change: 'up' | 'down' | 'stable';
};

function rankColumnRender({ place, change }: RankColumnRenderArgs) {
  return (
    <div className="flex-row justify-end gap-3">
      <span className="caption semibold text-1">{place}</span>
      {change === 'up' ? <RankUpIcon /> : null}
      {change === 'down' ? <RankDownIcon /> : null}
      {change === 'stable' ? <RankStableIcon /> : null}
    </div>
  );
}

const columns: TableColumn[] = [
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
  { title: 'NFT Achievements', key: 'NFTAchievements', align: 'right' },
  { title: 'Rank', key: 'rank', align: 'right', render: rankColumnRender }
];

function Leaderboard() {
  const { network } = useNetwork();
  const { data } = useGetLeaderboardByTimeframeQuery({
    timeframe: '1w',
    networkId: network.id
  });

  if (!data) return null;

  const rowsSortedByVolume = prepareLeaderboardTableRows({
    data,
    sortBy: 'volume',
    ticker: network.currency.ticker
  });

  return (
    <div className="flex-column justify-start align-start gap-6 width-full">
      <h1 className="heading semibold text-1">Leaderboard</h1>
      <Tabs direction="row" fullwidth defaultActiveId="volume">
        <Tabs.TabPane tab="Volume" id="volume">
          <Table columns={columns} rows={rowsSortedByVolume} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Markets created" id="marketsCreated" />
        <Tabs.TabPane tab="Won predictions" id="wonPredictions" />
        <Tabs.TabPane tab="Liquidity added" id="liquidityAdded" />
      </Tabs>
    </div>
  );
}

export default Leaderboard;
