import { Achievement } from 'components/pages/achievements';

import achievements from './mock';

function Achievements() {
  return (
    <div>
      <ul className="flex-row wrap gap-8">
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
