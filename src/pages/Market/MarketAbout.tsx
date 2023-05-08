import { useAppSelector } from 'hooks';

import marketClasses from './Market.module.scss';
import MarketTitle from './MarketTitle';

export default function MarketAbout() {
  // TODO: add the expand logic

  const description = useAppSelector(state => state.market.market.description);

  if (!description) return null;

  return (
    <section className={marketClasses.section}>
      <MarketTitle>About</MarketTitle>
      <p style={{ color: 'var(--color-text-primary)' }}>{description}</p>
    </section>
  );
}
