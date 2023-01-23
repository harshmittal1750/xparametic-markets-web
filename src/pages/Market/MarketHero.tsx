import { Container, Hero } from 'ui';
import Avatar from 'ui/Avatar';

import { Breadcrumb, Text } from 'components';
import MarketFooter from 'components/Market/MarketFooter';
import MarketFooterActions from 'components/Market/MarketFooterActions';

import { useAppSelector } from 'hooks';

import marketClasses from './Market.module.scss';

export default function MarketHero() {
  const market = useAppSelector(state => state.market.market);

  return (
    <Hero className={marketClasses.hero} $image={market.imageUrl}>
      <Container className={marketClasses.heroInfo}>
        <Avatar $size="lg" $radius="lg" alt="Market" src={market.imageUrl} />
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>{market.category}</Breadcrumb.Item>
            <Breadcrumb.Item>{market.subcategory}</Breadcrumb.Item>
          </Breadcrumb>
          <Text
            as="h2"
            fontWeight="bold"
            scale="heading-large"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {market.title}
          </Text>
        </div>
        <div className={marketClasses.heroInfoActions}>
          <MarketFooterActions $variant="filled" market={market} />
        </div>
      </Container>
      <Container className={marketClasses.heroStats}>
        <MarketFooter market={market} />
      </Container>
    </Hero>
  );
}
