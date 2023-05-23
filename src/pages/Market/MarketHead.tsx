import { Fragment } from 'react';

import { Container, Hero, useTheme } from 'ui';

import { MarketAvatar, MarketCategory, Text } from 'components';
import MarketFooter from 'components/Market/MarketFooter';
import MarketFooterActions from 'components/Market/MarketFooterActions';

import { useAppSelector, useMarketsColors } from 'hooks';

import marketClasses from './Market.module.scss';

function MarketHeadWrapper(
  props: React.PropsWithChildren<Record<string, unknown>>
) {
  const market = useAppSelector(state => state.market.market);
  const marketsColors = useMarketsColors();

  return (
    <Hero
      className={marketClasses.hero}
      $image={market.imageUrl}
      $backdrop={marketsColors.market}
      {...props}
    />
  );
}
export default function MarketHead() {
  const market = useAppSelector(state => state.market.market);
  const theme = useTheme();
  const MarketHeadWrapperComponent = theme.device.isDesktop
    ? MarketHeadWrapper
    : Fragment;

  return (
    <MarketHeadWrapperComponent>
      <Container
        $enableGutters={!theme.device.isDesktop}
        className={marketClasses.heroInfo}
      >
        <MarketAvatar
          $size={theme.device.isDesktop ? 'lg' : 'md'}
          imageUrl={market.imageUrl}
          verified={!theme.device.isDesktop && market.verified}
        />
        <div>
          <MarketCategory
            category={market.category}
            subcategory={market.subcategory}
            verified={theme.device.isDesktop && market.verified}
          />
          <Text
            as="h2"
            fontWeight={theme.device.isDesktop ? 'bold' : 'medium'}
            scale={theme.device.isDesktop ? 'heading-large' : 'body'}
            className={marketClasses.heroInfoTitle}
          >
            {market.title}
          </Text>
        </div>
        {theme.device.isDesktop && (
          <div className={marketClasses.heroInfoActions}>
            <MarketFooterActions $variant="filled" market={market} />
          </div>
        )}
      </Container>
      {theme.device.isDesktop && (
        <Container className={marketClasses.heroStats}>
          <MarketFooter market={market} />
        </Container>
      )}
    </MarketHeadWrapperComponent>
  );
}
