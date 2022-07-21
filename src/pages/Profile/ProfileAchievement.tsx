import { MedalIcon } from 'assets/icons';

import { Divider } from 'components';

const mock = {
  title: 'Count Fakula Polky',
  actionTitle: 'First Prediction Award',
  description:
    'Behold the magnificent crypto beast… wait… but this Vlad is not that into blood and he’s not that good when it comes to dealing cryptos. But who can blame him? Fake it until you make it.',
  imageUrl:
    'https://ipfs.io/ipfs/QmYVsPWS9BvJrTZMZrnpw3a7Mgkr1y4nq6kGACiucqSuQH',
  tokenCount: 1485,
  rarity: 'common'
};

type ProfileAchievementProps = {
  backgroundColor: '2' | '3';
};

function ProfileAchievement({ backgroundColor }: ProfileAchievementProps) {
  return (
    <div
      className={`flex-row align-center padding-6 margin-right-4 width-full gap-6 bg-${backgroundColor}`}
    >
      <img src={mock.imageUrl} alt={mock.title} width={104} height={104} />
      <div className="flex-column gap-3 width-full">
        <h4 className="pm-c-achievement__award-title heading-large bold">
          {mock.title}
        </h4>
        <p className="pm-c-achievement__award-description caption medium">
          {mock.description}
        </p>
        <div className="flex-row justify-space-between align-center gap-5">
          <div className="flex-row justify-start align-center gap-3">
            <MedalIcon className="pm-c-achievement__medal-icon--unlocked" />
            <h1 className="pm-c-achievement__title--unlocked tiny-uppercase semibold">
              {mock.actionTitle}
            </h1>
          </div>
          <div className="flex-row align-center gap-3">
            <span className="pm-c-achievement__claim-count tiny-uppercase semibold">
              {`${mock.tokenCount} claimed`}
            </span>
            <Divider variant="circle" />
            <span
              className={`pm-c-achievement__rarity--${mock.rarity} tiny-uppercase semibold`}
            >
              {mock.rarity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAchievement;
