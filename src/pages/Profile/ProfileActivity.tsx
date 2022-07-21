import nfl from './mock/images/nfl.png';
import worldCup from './mock/images/world_cup.png';

const mock = {
  won: {
    title: 'You won a prediction on the market',
    marketTitle: 'Will Germany finish first in Group E of FIFA World Cup 2022?',
    image: worldCup,
    timestamp: '2 weeks ago',
    bg: '2'
  },
  lost: {
    title: 'You lost a prediction on the market',
    marketTitle:
      'Will Los Angeles Rams win against Buffalo Bills in the NFL match on 9th September 2022?',
    image: nfl,
    timestamp: '2 weeks ago',
    bg: '3'
  }
};

type ProfileActivityProps = {
  result: 'won' | 'lost';
};

function ProfileActivity({ result }: ProfileActivityProps) {
  const mockByResult = mock[result];
  return (
    <div
      className={`pm-c-activity flex-row align-center padding-y-7 padding-x-6 margin-right-4 gap-6 width-full bg-${mockByResult.bg}`}
    >
      <div className={`pm-c-activity__image--${result} border-radius-50`}>
        <img
          className="border-radius-50"
          src={mockByResult.image}
          alt={mockByResult.title}
          width={64}
          height={64}
        />
      </div>
      <div className="flex-column gap-3">
        <h1
          className={`pm-c-activity__title--${result} tiny-uppercase semibold`}
        >
          {mockByResult.title}
        </h1>
        <p className="body font-semibold text-1">{mockByResult.marketTitle}</p>
        <span className="tiny-uppercase semibold text-3">
          {mockByResult.timestamp}
        </span>
      </div>
    </div>
  );
}

export default ProfileActivity;
