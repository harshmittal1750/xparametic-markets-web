import { environment, features } from 'config';

function useFantasyTokenName() {
  if (features.fantasy.enabled && environment.FEATURE_FANTASY_TOKEN_NAME) {
    return environment.FEATURE_FANTASY_TOKEN_NAME;
  }

  return undefined;
}

export default useFantasyTokenName;
