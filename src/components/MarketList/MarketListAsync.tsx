import { useEffect } from 'react';

import cn from 'classnames';

import { InfoIcon } from 'assets/icons';

import Footer from 'components/Footer';

import useMarkets from 'hooks/useMarkets';

import { Button } from '../Button';
import Text from '../Text';
import MarketList from './MarketList';

export default function MarketListAsync() {
  const markets = useMarkets();

  useEffect(() => {
    markets.fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn('pm-c-market-list', {
        'd-flex ff-column': markets.state !== 'success'
      })}
    >
      {
        {
          loading: (
            <div className="pm-c-market-list__empty-state">
              <div className="pm-c-market-list__empty-state__body">
                <span className="spinner--primary" />
              </div>
            </div>
          ),
          error: (
            <div className="pm-c-market-list__error">
              <div className="pm-c-market-list__error__body">
                <InfoIcon />
                <Text
                  as="p"
                  scale="tiny"
                  fontWeight="semibold"
                  className="pm-c-market-list__empty-state__body-description"
                >
                  Error fetching markets
                </Text>
              </div>
              <div className="pm-c-market-list__error__actions">
                <Button color="primary" size="sm" onClick={markets.fetch}>
                  Try again
                </Button>
              </div>
            </div>
          ),
          warning: (
            <div className="pm-c-market-list__empty-state">
              <div className="pm-c-market-list__empty-state__body">
                <InfoIcon />
                <Text
                  as="p"
                  scale="tiny"
                  fontWeight="semibold"
                  className="pm-c-market-list__empty-state__body-description"
                >
                  There are no available markets for this category.
                </Text>
              </div>
            </div>
          ),
          success: <MarketList markets={markets} />
        }[markets.state]
      }
      {markets.state !== 'success' && <Footer className="m-auto" />}
    </div>
  );
}
