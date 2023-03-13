import { Fragment } from 'react';

import { Container, Hero, useMedia } from 'ui';

import { MarketAvatar, MarketCategory, Text } from 'components';
import MarketFooter from 'components/Market/MarketFooter';
import MarketFooterActions from 'components/Market/MarketFooterActions';

import { useAppSelector } from 'hooks';

import marketClasses from './Market.module.scss';

function MarketHeadWrapper(
  props: React.PropsWithChildren<Record<string, unknown>>
) {
  const id = useAppSelector(state => state.market.market.id);
  const imageUrl = useAppSelector(state => state.market.market.imageUrl);
  const colors = useAppSelector(state => state.ui.market.colors);

  return (
    <Hero
      className={marketClasses.hero}
      $image={imageUrl}
      $backdrop={colors[id]}
      {...props}
    />
  );
}
export default function MarketHead() {
  const market = useAppSelector(state => state.market.market);
  const isDesktop = useMedia('(min-width: 1024px)');
  const MarketHeadWrapperComponent = isDesktop ? MarketHeadWrapper : Fragment;

  return (
    <MarketHeadWrapperComponent>
      <Container $enableGutters={!isDesktop} className={marketClasses.heroInfo}>
        <MarketAvatar
          $size={isDesktop ? 'lg' : 'md'}
          imageUrl={market.imageUrl}
          verified={!isDesktop && market.verified}
        />
        <div>
          <MarketCategory
            category={market.category}
            subcategory={market.subcategory}
            verified={isDesktop && market.verified}
          />
          <Text
            as="h2"
            fontWeight={isDesktop ? 'bold' : 'medium'}
            scale={isDesktop ? 'heading-large' : 'body'}
            className={marketClasses.heroInfoTitle}
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
    </MarketHeadWrapperComponent>
  );
}
