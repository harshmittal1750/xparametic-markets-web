import { LeaderboardAchievement } from 'types/leaderboard';

import { MedalIcon } from 'assets/icons';

import { Divider } from 'components';

type ProfileAchievementProps = {
  achievement: LeaderboardAchievement;
  backgroundColor: '2' | '3';
};

function ProfileAchievement({
  achievement,
  backgroundColor
}: ProfileAchievementProps) {
  const { image, name, actionTitle, rarity } = achievement;

  return (
    <div
      className={`flex-row align-center padding-6 margin-right-4 width-full gap-6 bg-${backgroundColor}`}
    >
      <img src={image} alt={name} width={104} height={104} />
      <div className="flex-column gap-3 width-full">
        <h4 className="pm-c-achievement__award-title heading-large bold">
          {name}
        </h4>
        {/* <p className="pm-c-achievement__award-description caption medium">
          {mock.description}
        </p> */}
        <div className="flex-row justify-space-between align-center gap-5">
          <div className="flex-row justify-start align-center gap-3">
            <MedalIcon className="pm-c-achievement__medal-icon--unlocked" />
            <h1 className="pm-c-achievement__title--unlocked tiny-uppercase semibold">
              {actionTitle}
            </h1>
          </div>
          <div className="flex-row align-center gap-3">
            {/* <span className="pm-c-achievement__claim-count tiny-uppercase semibold">
              {`${mock.tokenCount} claimed`}
            </span>
            <Divider variant="circle" /> */}
            <span
              className={`pm-c-achievement__rarity--${rarity} tiny-uppercase semibold`}
            >
              {rarity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAchievement;
