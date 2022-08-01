export type LeaderboardAchievement = {
  id: number;
  name: string;
  image: string;
  attributes: {
    value: number | string;
    traitType: string;
  }[];
};
