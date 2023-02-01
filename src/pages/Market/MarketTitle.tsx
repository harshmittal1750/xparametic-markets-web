import { Text } from 'components';

import marketClasses from './Market.module.scss';

export default function MarketTitle({
  children
}: React.PropsWithChildren<Record<string, unknown>>) {
  // TODO: ADJUST TEXT TO DOES NOT SHRINK

  return (
    <Text
      as="h3"
      scale="tiny-uppercase"
      fontWeight="bold"
      color="gray"
      className={marketClasses.title}
    >
      <span className={marketClasses.titleContent}>{children}</span>
    </Text>
  );
}
