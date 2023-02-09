import { Fragment, useRef } from 'react';

import { Container, Hero, useAverageColor, useMedia } from 'ui';
import Avatar from 'ui/Avatar';

import { Breadcrumb, Text } from 'components';
import MarketFooter from 'components/Market/MarketFooter';
import MarketFooterActions from 'components/Market/MarketFooterActions';

import { useAppSelector } from 'hooks';

import marketClasses from './Market.module.scss';

function MarketHeadWrapper(
  props: React.PropsWithChildren<Record<string, unknown>>
) {
  const imageUrl = useAppSelector(state => state.market.market.imageUrl);

  return <Hero className={marketClasses.hero} $image={imageUrl} {...props} />;
}
export default function MarketHead() {
  const market = useAppSelector(state => state.market.market);
  const isDesktop = useMedia('(min-width: 1024px)');
  const MarketHeadWrapperComponent = isDesktop ? MarketHeadWrapper : Fragment;
  const ref = useRef<HTMLImageElement>(null);
  const RGB = useAverageColor(ref);

  return (
    <MarketHeadWrapperComponent
      {...(isDesktop && {
        style: {
          '--linear-gradient': `${RGB.red} ${RGB.green} ${RGB.blue}`
        }
      })}
    >
      <Container $enableGutters={!isDesktop} className={marketClasses.heroInfo}>
        <Avatar
          ref={ref}
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
    </MarketHeadWrapperComponent>
  );
}
