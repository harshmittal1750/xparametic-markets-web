import { relativeTimeFromNow } from 'helpers/date';
import { FeedActivity } from 'types/portfolio';

type ProfileActivityProps = {
  activity: FeedActivity;
  backgroundColor: '2' | '3';
};

function ProfileActivity({ activity, backgroundColor }: ProfileActivityProps) {
  const {
    accentColor,
    imageUrl,
    marketTitle,
    marketSlug,
    actionTitle,
    timestamp
  } = activity;

  return (
    <a
      className={`pm-c-activity flex-row align-center padding-y-7 padding-x-6 margin-right-4 gap-6 width-full bg-${backgroundColor}`}
      href={`/markets/${marketSlug}`}
    >
      <div className={`pm-c-activity__image--${accentColor} border-radius-50`}>
        <img
          className="border-radius-50"
          src={imageUrl}
          alt={marketTitle}
          width={64}
          height={64}
        />
      </div>
      <div className="flex-column gap-3">
        <h1
          className={`pm-c-activity__title--${accentColor} tiny-uppercase semibold`}
        >
          {actionTitle}
        </h1>
        <p className="body font-semibold text-1">{marketTitle}</p>
        <span className="tiny-uppercase semibold text-3">
          {relativeTimeFromNow(timestamp * 1000)}
        </span>
      </div>
    </a>
  );
}

export default ProfileActivity;
