type Award = {
  title: string;
  description: string;
  imageURL: string;
};

type AchievementStatus = 'available' | 'unavailable' | 'claimed';

type AchievementRarity = 'common' | 'rare';

type AchievementProps = {
  title: string;
  award: Award;
  status: AchievementStatus;
  claimCount: number;
  rarity: AchievementRarity;
};

function Achievement() {
  return (
    <div className="pm-c-achievement">
      <div className="pm-c-achievement__content" />
      <div className="pm-c-achievement__footer" />
    </div>
  );
}

export default Achievement;
