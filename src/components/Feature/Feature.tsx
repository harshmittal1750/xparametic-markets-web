import { features } from 'config';

type FeatureProps = {
  name: keyof typeof features;
  children: JSX.Element;
};

function Feature({ name, children }: FeatureProps): JSX.Element | null {
  const feature = features[name];

  if (feature && feature.enabled) {
    return children;
  }

  return null;
}

export default Feature;
