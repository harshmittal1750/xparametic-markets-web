import { useEffect, useState } from 'react';

import { BeproService } from 'services';
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
  const { network, networkConfig } = useNetwork();
  const {
    data: achievements,
    isFetching,
    isLoading
  } = useGetAchievementsQuery({
    networkId: network.id
  });

  const [filter, setFilter] = useState(achievementFilters[0].value);
  const [userAchievements, setUserAchievements] = useState({});

  useEffect(() => {
    async function getUserAchievements() {
      const beproService = new BeproService(networkConfig);
      await beproService.login();

      const response = await beproService.getAchievements();
      setUserAchievements(response);
    }

    getUserAchievements();
  }, [network]);

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
        {achievements?.filter(filters[filter]).map(achievement => {
          let status = 'unavailable';
          if (userAchievements[achievement.id]?.claimed) {
            status = 'claimed';
          } else if (userAchievements[achievement.id]?.canClaim) {
            status = 'available';
          }

          return (
            <li key={achievement.id}>
              <Achievement {...{ ...achievement, status }} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Achievements;
