import environment from './environment';

function toBoolean(value: string | undefined): boolean {
  return value?.toLocaleLowerCase() === 'true';
}

const features = [
  {
    name: 'fantasy',
    enabled: toBoolean(environment.FEATURE_FANTASY)
  },
  {
    name: 'regular',
    enabled: !toBoolean(environment.FEATURE_FANTASY)
  }
] as const;

export default features;
