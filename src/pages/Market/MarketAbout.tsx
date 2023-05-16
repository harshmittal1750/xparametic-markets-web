import { Text } from 'components';

import marketClasses from './Market.module.scss';
import MarketTitle from './MarketTitle';

export default function MarketAbout({
  children
}: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <section className={marketClasses.section}>
      <MarketTitle>About</MarketTitle>
      {children
        ?.toString()
        .split(/\\n/g)
        .filter(Boolean)
        .map(paragraph => (
          <Text
            key={paragraph}
            fontWeight="medium"
            scale="body"
            className={marketClasses.aboutDescription}
          >
            {paragraph}
          </Text>
        ))}
    </section>
  );
}
