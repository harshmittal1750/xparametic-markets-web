import { Market as MarketInterface } from 'models/market';

import Breadcrumb from '../Breadcrumb';
import Text from '../Text';
import MarketFooter from './MarketFooter';
import MarketOutcomes from './MarketOutcomes';

type MarketCardProps = {
  market: MarketInterface;
};

function MarketAvatar(props: Record<'src' | 'alt', string>) {
  return (
    <figure className="pm-c-market__body-avatar">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img className="pm-c-market__body-image" {...props} />
    </figure>
  );
}
function Market({ market }: MarketCardProps) {
  return (
    <div className="pm-c-market">
      <div className="pm-c-market__body">
        <MarketAvatar src={market.imageUrl} alt="Market Avatar" />
        <div className="pm-c-market__body-details">
          <Breadcrumb>
            <Breadcrumb.Item>{`${market.category.toLowerCase()}`}</Breadcrumb.Item>
            <Breadcrumb.Item>{market.subcategory}</Breadcrumb.Item>
          </Breadcrumb>
          <Text as="p" scale="body" fontWeight="medium">
            {market.title}
          </Text>
        </div>
      </div>
    </div>
  );
}

Market.Outcomes = MarketOutcomes;
Market.Footer = MarketFooter;

export default Market;
