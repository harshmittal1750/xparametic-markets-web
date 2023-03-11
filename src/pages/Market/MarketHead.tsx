import { Fragment } from 'react';

import { Container, Hero, useTheme } from 'ui';

import { MarketAvatar, MarketCategory, Text } from 'components';
import MarketFooter from 'components/Market/MarketFooter';
import MarketFooterActions from 'components/Market/MarketFooterActions';

import { useAppSelector } from 'hooks';

import marketClasses from './Market.module.scss';

function MarketHeadWrapper(
  props: React.PropsWithChildren<Record<string, unknown>>
) {
  const imageUrl = useAppSelector(state => state.market.market.imageUrl);
  const avatarColor = useAppSelector(state => state.ui.market.avatar.color);

  return (
    <Hero
      className={marketClasses.hero}
      $image={imageUrl}
      style={{
        // @ts-expect-error No need to assert React.CSSProperties here
        '--linear-gradient':
          avatarColor || localStorage.getItem('MARKET_AVATAR_COLOR')
      }}
      {...props}
    />
  );
}
export default function MarketHead() {
  const market = useAppSelector(state => state.market.market);
  const theme = useTheme();
  const MarketHeadWrapperComponent = theme.device.type.isDesktop
    ? MarketHeadWrapper
    : Fragment;

  return (
    <MarketHeadWrapperComponent>
      <Container
        $enableGutters={!theme.device.type.isDesktop}
        className={marketClasses.heroInfo}
      >
        <MarketAvatar
          $size={theme.device.type.isDesktop ? 'lg' : 'md'}
          imageUrl={market.imageUrl}
          verified={!theme.device.type.isDesktop && market.verified}
        />
        <div>
          <MarketCategory
            category={market.category}
            subcategory={market.subcategory}
            verified={theme.device.type.isDesktop && market.verified}
          />
          <Text
            as="h2"
            fontWeight={theme.device.type.isDesktop ? 'bold' : 'medium'}
            scale={theme.device.type.isDesktop ? 'heading-large' : 'body'}
            className={marketClasses.heroInfoTitle}
          >
            {market.title}
          </Text>
        </div>
        {theme.device.type.isDesktop && (
          <div className={marketClasses.heroInfoActions}>
            <MarketFooterActions $variant="filled" market={market} />
          </div>
        )}
      </Container>
      {theme.device.type.isDesktop && (
        <Container className={marketClasses.heroStats}>
          <MarketFooter market={market} />
        </Container>
      )}
    </MarketHeadWrapperComponent>
  );
}
