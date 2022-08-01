export type LeaderboardAchievement = {
  id: number;
  name: string;
  image: string;
  attributes: {
    value: number | string;
    traitType: string;
  }[];
};

export type LeaderboardTimeframe = '1w' | '1m' | 'at';
