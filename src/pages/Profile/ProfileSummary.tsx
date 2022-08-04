import { Text } from 'components/new';

import ProfileSummaryStat from './ProfileSummaryStat';

type ProfileSummaryProps = {
  address: string;
};

function ProfileSummary({ address }: ProfileSummaryProps) {
  return (
    <div className="pm-p-profile-summary">
      <div className="pm-p-profile-summary__details">
        <Text as="span" fontSize="heading-2" fontWeight="bold" color="1">
          {address}
        </Text>
        <div className="flex-row gap-3">
          <span className="tiny-uppercase font-semibold text-3">
            {`First prediction: `}
            <strong className="text-2">August 11, 2021</strong>
          </span>
          <span className="pm-c-divider--circle" />
          <span className="tiny-uppercase font-semibold text-3">
            {`Total predictions: `}
            <strong className="text-2">2,489</strong>
          </span>
        </div>
      </div>
      <div className="flex-row gap-5">
        <ProfileSummaryStat
          title="Total earnings"
          value="$23,485"
          backgroundColor="yellow"
        />
        <ProfileSummaryStat
          title="Liquidity provided"
          value="$11,482"
          backgroundColor="pink"
        />
        <ProfileSummaryStat
          title="Won predictions"
          value="1,248"
          backgroundColor="orange"
        />
      </div>
    </div>
  );
}

export default ProfileSummary;
