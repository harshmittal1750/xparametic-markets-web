import environment from './environment';

function toBoolean(value: string | undefined): boolean {
  return value?.toLocaleLowerCase() === 'true';
}

const features = {
  regular: {
    enabled: !toBoolean(environment.FEATURE_FANTASY)
  },
  fantasy: {
    enabled: toBoolean(environment.FEATURE_FANTASY)
  }
} as const;

export default features;
