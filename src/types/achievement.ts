export type AchievementAction =
  | 'buy'
  | 'add_liquidity'
  | 'bond'
  | 'claim_winnings'
  | 'create_market';

export type Achievement = {
  id: number;
  networkId: number;
  action: AchievementAction;
  occurrences: number;
  imageUrl: string;
  verified: boolean;
  title: string;
  description: string;
};
