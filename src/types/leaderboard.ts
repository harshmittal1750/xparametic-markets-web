import { AchievementAction, AchievementRarity } from './achievement';

export type LeaderboardAchievement = {
  id: number;
  name: string;
  image: string;
  attributes: {
    value: number | string;
    traitType: string;
  }[];
  action: AchievementAction;
  actionTitle: string;
  occurences: number;
  rarity: AchievementRarity;
};

export type LeaderboardTimeframe = '1w' | '1m' | 'at';
