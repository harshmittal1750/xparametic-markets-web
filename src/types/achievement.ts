export type Award = {
  title: string;
  description: string;
  imageURL: string;
};

export type AchievementStatus = 'available' | 'unavailable' | 'claimed';

export type AchievementRarity = 'common' | 'rare';

export type Achievement = {
  id: string | number;
  title: string;
  award: Award;
  status: AchievementStatus;
  claimCount: number;
  rarity: AchievementRarity;
};
