import { Market as MarketInterface } from 'models/market';

import Breadcrumb from '../Breadcrumb';
import Text from '../Text';
import MarketFooter from './MarketFooter';
import MarketOutcomes from './MarketOutcomes';

type MarketCardProps = {
  market: MarketInterface;
};

function Market({ market }: MarketCardProps) {
  return (
    <div className="pm-c-market">
      <div className="pm-c-market__body">
        <figure className="pm-c-market__body-avatar">
          <img
            className="pm-c-market__body-image"
            src={market.imageUrl}
            alt="Market Avatar"
          />
        </figure>
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
