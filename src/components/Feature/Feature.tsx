import { features } from 'config';

type FeatureProps = React.PropsWithChildren<{
  name: keyof typeof features;
}>;

function Feature({ name, children }: FeatureProps) {
  const feature = features[name];

  if (feature && feature.enabled) {
    return <>{children}</>;
  }

  return null;
}

export default Feature;
