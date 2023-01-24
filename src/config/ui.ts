import intersection from 'lodash/intersection';

import {
  leaderboardColumns,
  defaultLeaderboardColumns
} from 'pages/Leaderboard/Leaderboard.util';

import environment from './environment';
import features from './features';

const ui = {
  hero: {
    image: environment.UI_HERO_IMAGE,
    header: environment.UI_HERO_HEADER,
    title: environment.UI_HERO_TITLE,
    action: {
      title: environment.UI_HERO_ACTION_TITLE,
      url: environment.UI_HERO_ACTION_URL
    }
  },
  tradeForm: {
    liquidity: {
      enabled: features.regular.enabled
    }
  },
  reportForm: {
    enabled: features.regular.enabled
  },
  leaderboard: {
    columns: features.fantasy.enabled
      ? intersection(
          environment.UI_LEADERBOARD_COLUMNS?.split(',') ||
            defaultLeaderboardColumns,
          leaderboardColumns
        )
      : defaultLeaderboardColumns
  },
  clubs: {
    enabled: features.fantasy.enabled
  }
} as const;

export default ui;
