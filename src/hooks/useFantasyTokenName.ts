import { environment, features } from 'config';

function useFantasyTokenName() {
  if (features.fantasy.enabled && environment.FEATURE_FANTASY_TOKEN_TICKER) {
    return environment.FEATURE_FANTASY_TOKEN_TICKER;
  }

  return undefined;
}

export default useFantasyTokenName;
