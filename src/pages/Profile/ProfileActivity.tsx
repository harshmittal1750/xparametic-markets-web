import { relativeTimeFromNow } from 'helpers/date';
import { FeedActivity } from 'types/portfolio';

import { Text } from 'components/new';

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
      className={`pm-c-activity bg-${backgroundColor}`}
      href={`/markets/${marketSlug}?m=f`}
    >
      <div className={`pm-c-activity__image--${accentColor} border-radius-50`}>
        <img
          className="border-radius-50"
          src={imageUrl}
          alt=""
          width={64}
          height={64}
        />
      </div>
      <div className="flex-column gap-3 width-full">
        <Text
          as="h1"
          fontSize="body-4"
          fontWeight="semibold"
          transform="uppercase"
          className={`pm-c-activity__action-title--${accentColor}`}
        >
          {actionTitle}
        </Text>
        <Text
          className="pm-c-activity__title"
          as="p"
          fontSize="body-1"
          fontWeight="semibold"
          color="1"
        >
          {marketTitle}
        </Text>
        <Text
          as="span"
          fontSize="body-4"
          fontWeight="semibold"
          transform="uppercase"
          color="3"
        >
          {relativeTimeFromNow(timestamp * 1000)}
        </Text>
      </div>
    </a>
  );
}

export default ProfileActivity;
