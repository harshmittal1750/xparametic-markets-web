export type AchievementAction =
  | 'buy'
  | 'add_liquidity'
  | 'bond'
  | 'claim_winnings'
  | 'create_market';

export type AchievementRarity = 'common' | 'rare';

export type Achievement = {
  id: number;
  networkId: number;
  title: string;
  description: string;
  imageUrl: string;
  action: AchievementAction;
  occurrences: number;
  actionTitle: string;
  rarity: AchievementRarity;
  verified: boolean;
  status: string;
};
