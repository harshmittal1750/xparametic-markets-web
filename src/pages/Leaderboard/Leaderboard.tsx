import { Tabs } from 'components';

function Leaderboard() {
  return (
    <div className="flex-column justify-start align-start gap-6 width-full">
      <h1 className="heading semibold text-1">Leaderboard</h1>
      <Tabs direction="row" defaultActiveId="volume">
        <Tabs.TabPane tab="Volume" id="volume" />
        <Tabs.TabPane tab="Markets created" id="marketsCreated" />
        <Tabs.TabPane tab="Won predictions" id="wonPredictions" />
        <Tabs.TabPane tab="Liquidity added" id="liquidityAdded" />
      </Tabs>
    </div>
  );
}

export default Leaderboard;
