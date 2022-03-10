import { InfoIcon } from 'assets/icons';

import { Text } from 'components';

function AchievementsEmpty() {
  return (
    <div className="pm-p-achievements__empty">
      <div className="pm-p-achievements__empty__body">
        <InfoIcon />
        <Text
          as="p"
          scale="tiny"
          fontWeight="semibold"
          className="pm-p-achievements__empty__body-description"
        >
          There are no available achievements.
        </Text>
      </div>
    </div>
  );
}

export default AchievementsEmpty;
