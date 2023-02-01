import { Fragment } from 'react';

import { Container, Hero, useMedia } from 'ui';
import Avatar from 'ui/Avatar';

import { Breadcrumb, Text } from 'components';
import MarketFooter from 'components/Market/MarketFooter';
import MarketFooterActions from 'components/Market/MarketFooterActions';

import { useAppSelector } from 'hooks';

import marketClasses from './Market.module.scss';

function MarketHeroWrapper(
  props: React.PropsWithChildren<Record<string, unknown>>
) {
  const market = useAppSelector(state => state.market.market);

  return (
    <Hero className={marketClasses.hero} $image={market.imageUrl} {...props} />
  );
}
export default function MarketHero() {
  const market = useAppSelector(state => state.market.market);
  const isDesktop = useMedia('(min-width: 1024px)');
  const MarketHeroWrapperComponent = isDesktop ? MarketHeroWrapper : Fragment;

  return (
    <MarketHeroWrapperComponent>
      <Container $enableGutters={!isDesktop} className={marketClasses.heroInfo}>
        <Avatar
          $size={isDesktop ? 'lg' : 'md'}
          $radius="lg"
          alt="Market"
          src={market.imageUrl}
        />
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>{market.category}</Breadcrumb.Item>
            <Breadcrumb.Item>{market.subcategory}</Breadcrumb.Item>
          </Breadcrumb>
          <Text
            as="h2"
            fontWeight={isDesktop ? 'bold' : 'medium'}
            scale={isDesktop ? 'heading-large' : 'body'}
            style={{ color: 'var(--color-text-primary)' }}
          >
            {market.title}
          </Text>
        </div>
        {isDesktop && (
          <div className={marketClasses.heroInfoActions}>
            <MarketFooterActions $variant="filled" market={market} />
          </div>
        )}
      </Container>
      {isDesktop && (
        <Container className={marketClasses.heroStats}>
          <MarketFooter market={market} />
        </Container>
      )}
    </MarketHeroWrapperComponent>
  );
}
