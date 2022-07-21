import ProfileSummaryStat from './ProfileSummaryStat';

function ProfileSummary() {
  return (
    <div className="flex-row wrap gap-5 justify-space-between">
      <div className="flex-column gap-3">
        <span className="text-heading-2 font-bold text-1">
          0xc0ffee254729296a45a3885639AC7E10F9d54979
        </span>
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
