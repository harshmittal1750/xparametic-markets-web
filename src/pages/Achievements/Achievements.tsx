import { Achievement } from 'components/pages/achievements';

import achievements from './mock';

function Achievements() {
  return (
    <div className="pm-p-achievements flex-column gap-4">
      <div className="flex-row justify-space-between align-center padding-bottom-3">
        <h1 className="pm-p-achievements__title heading semibold">
          Achievements
        </h1>
      </div>
      <ul className="pm-p-achievements__list">
        {achievements.map(achievement => (
          <li key={achievement.id}>
            <Achievement {...achievement} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Achievements;
