import environment from './environment';

function toBoolean(value: string | undefined): boolean {
  return value?.toLocaleLowerCase() === 'true';
}

const features = [
  {
    name: 'claim',
    enabled: toBoolean(environment.FEATURE_CLAIM)
  }
] as const;

export default features;
