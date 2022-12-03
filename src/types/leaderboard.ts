import { AchievementAction, AchievementRarity } from './achievement';

export type LeaderboardAchievement = {
  id: number;
  name: string;
  image: string;
  description: string;
  attributes: {
    value: number | string;
    traitType: string;
  }[];
  action: AchievementAction;
  actionTitle: string;
  occurences: number;
  rarity: AchievementRarity;
  tokenCount: number;
};

export type LeaderboardTimeframe = '1w' | '1m' | 'at';

export type LeaderboardGroup = {
  id: number;
  title: string;
  imageUrl: string;
  slug: string;
  createdBy: string;
  users: string[];
  createdAt: string;
  updatedAt: string;
};

export type UserLeaderboard = {
  id: number;
  title: string;
  slug: string;
  admin: boolean;
};
