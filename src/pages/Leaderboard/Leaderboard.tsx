import {
  FirstPlaceIcon,
  SecondPlaceIcon,
  ThirdPlaceIcon,
  RankUpIcon,
  RankDownIcon,
  RankStableIcon
} from 'assets/icons/pages/leaderboard';

import { Tabs } from 'components';
import { Table } from 'components/new';
import { TableColumn, TableRow } from 'components/new/Table';

import { ETH } from 'hooks/useNetwork/currencies';

type WalletColumnRenderArgs = {
  address: string;
  place: number;
};

function walletColumnRender({ address, place }: WalletColumnRenderArgs) {
  return (
    <div className="flex-row gap-4">
      {place === 1 ? <FirstPlaceIcon /> : null}
      {place === 2 ? <SecondPlaceIcon /> : null}
      {place === 3 ? <ThirdPlaceIcon /> : null}
      <span className="caption semibold text-1">{address}</span>
    </div>
  );
}

type VolumeColumnRenderArgs = {
  volume: number;
};

function volumeColumnRender(volume: VolumeColumnRenderArgs) {
  return (
    <span className="caption semibold text-1 whitespace-nowrap">
      {`${volume} `}
      {ETH.symbol}
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

const rows: TableRow[] = [
  {
    key: '1',
    wallet: {
      address: 'Ox23y8632',
      place: 1
    },
    volume: 0.126,
    marketsCreated: 124,
    wonPredictions: 284,
    liquidityAdded: 100,
    NFTAchievements: [],
    rank: {
      place: 1,
      change: 'up'
    }
  },
  {
    key: '2',
    wallet: {
      address: 'Ox23y8632',
      place: 2
    },
    volume: 0.126,
    marketsCreated: 24,
    wonPredictions: 84,
    liquidityAdded: 100,
    NFTAchievements: [],
    rank: {
      place: 2,
      change: 'down'
    }
  },
  {
    key: '3',
    wallet: {
      address: 'Ox23y8632',
      place: 3
    },
    volume: 0.126,
    marketsCreated: 12,
    wonPredictions: 28,
    liquidityAdded: 100,
    NFTAchievements: [],
    rank: {
      place: 3,
      change: 'stable'
    }
  }
];

function Leaderboard() {
  return (
    <div className="flex-column justify-start align-start gap-6 width-full">
      <h1 className="heading semibold text-1">Leaderboard</h1>
      <Tabs direction="row" fullwidth defaultActiveId="volume">
        <Tabs.TabPane tab="Volume" id="volume">
          <Table columns={columns} rows={rows} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Markets created" id="marketsCreated" />
        <Tabs.TabPane tab="Won predictions" id="wonPredictions" />
        <Tabs.TabPane tab="Liquidity added" id="liquidityAdded" />
      </Tabs>
    </div>
  );
}

export default Leaderboard;
