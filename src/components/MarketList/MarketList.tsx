import { useCallback, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';

import cn from 'classnames';
import type { Market } from 'models/market';

import { InfoIcon } from 'assets/icons';

import PredictionCard from 'components/PredictionCard';

import useMarkets from 'hooks/useMarkets';

import { Button } from '../Button';
import Text from '../Text';

export default function MarketList() {
  const markets = useMarkets();
  const handleItemContent = useCallback(
    (index: number, data: Market) => (
      <PredictionCard
        market={data}
        className={cn({
          'mb-grid': index !== markets.data.length - 1
        })}
      />
    ),
    [markets.data.length]
  );

  useEffect(() => {
    markets.fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pm-c-market-list p-grid">
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
          success: (
            <Virtuoso
              useWindowScroll
              data={markets.data}
              itemContent={handleItemContent}
            />
          )
        }[markets.state]
      }
    </div>
  );
}
