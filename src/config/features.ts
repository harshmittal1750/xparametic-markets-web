import isTrue from 'helpers/isTrue';

import environment from './environment';

const features = {
  regular: {
    enabled: !isTrue(environment.FEATURE_FANTASY)
  },
  fantasy: {
    enabled: isTrue(environment.FEATURE_FANTASY)
  }
} as const;

export default features;
