import { Tabs } from 'components';
import { Table } from 'components/new';
import { TableColumn, TableRow } from 'components/new/Table';

const columns: TableColumn[] = [
  { title: 'Wallet', key: 'wallet', align: 'left' },
  { title: 'Volume', key: 'volume', align: 'center' },
  { title: 'Markets Created', key: 'marketsCreated', align: 'center' },
  { title: 'Won Predictions', key: 'wonPredictions', align: 'center' },
  { title: 'Liquidity Added', key: 'liquidityAdded', align: 'center' },
  { title: 'NFT Achievements', key: 'NFTAchievements', align: 'center' },
  { title: 'Rank', key: 'rank', align: 'right' }
];

const rows: TableRow[] = [];

function Leaderboard() {
  return (
    <div className="flex-column justify-start align-start gap-6 width-full">
      <h1 className="heading semibold text-1">Leaderboard</h1>
      <Tabs direction="row" defaultActiveId="volume">
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
