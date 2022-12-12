import { features } from 'config';

type FeatureProps = {
  name: typeof features[number]['name'];
  children: JSX.Element;
};

function Feature({ name, children }: FeatureProps): JSX.Element | null {
  const feature = features.find(feat => feat.name === name);

  if (feature && feature.enabled) {
    return children;
  }

  return null;
}

export default Feature;
