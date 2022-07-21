type ProfileSummaryStatProps = {
  title: string;
  value: string;
  backgroundColor: 'yellow' | 'blue' | 'green' | 'pink' | 'orange';
};

function ProfileSummaryStat({
  title,
  value,
  backgroundColor
}: ProfileSummaryStatProps) {
  return (
    <div
      className={`flex-column justify-start align-start gap-2 padding-5 bg-gradient-${backgroundColor} border-radius-small`}
    >
      <h5 className="tiny-uppercase font-bold text-white-50">{title}</h5>
      <span className="body font-semibold text-light">{value}</span>
    </div>
  );
}

export default ProfileSummaryStat;
