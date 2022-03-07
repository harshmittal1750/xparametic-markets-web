import { useState } from 'react';

import { useGetAchievementsQuery } from 'services/Polkamarkets';

import {
  Achievement,
  AchievementFilter,
  Item
} from 'components/pages/achievements';

import { useNetwork } from 'hooks';

import AchievementsLoading from './AchievementsLoading';

const achievementFilters: Item[] = [
  {
    id: 'all',
    name: 'ALL',
    value: 'all'
  },
  {
    id: 'available',
    name: 'AVAILABLE',
    value: 'available'
  },
  {
    id: 'unavailable',
    name: 'UNAVAILABLE',
    value: 'unavailable'
  }
];

const filters = {
  all: items => items,
  available: items => items.status === 'available',
  unavailable: items => items.status === 'unavailable'
};

function Achievements() {
  const { network } = useNetwork();
  const {
    data: achievements,
    isFetching,
    isLoading
  } = useGetAchievementsQuery({
    networkId: network.id
  });

  const [filter, setFilter] = useState(achievementFilters[0].value);

  if (isFetching || isLoading) return <AchievementsLoading />;

  return (
    <div className="pm-p-achievements flex-column gap-4">
      <div className="flex-row wrap justify-space-between align-center gap-6 padding-bottom-3">
        <h1 className="pm-p-achievements__title heading semibold">
          Achievements
        </h1>
        <AchievementFilter
          items={achievementFilters}
          defaultItemId={achievementFilters[0].id}
          onChangeItem={(_item, value) => setFilter(value)}
        />
      </div>
      <ul className="pm-p-achievements__list">
        {achievements?.filter(filters[filter]).map(achievement => (
          <li key={achievement.id}>
            <Achievement {...achievement} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Achievements;
