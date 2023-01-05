import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  VirtuosoProps as ReactVirtuosoProps,
  VirtuosoHandle,
  ListRange
} from 'react-virtuoso';
import { Virtuoso as ReactVirtuoso } from 'react-virtuoso';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import type { Market } from 'models/market';

import { InfoIcon } from 'assets/icons';

import PredictionCard from 'components/PredictionCard';

import useMarkets from 'hooks/useMarkets';

import { Button } from '../Button';
import Text from '../Text';

type VirtuosoProps = Omit<
  ReactVirtuosoProps<Market, unknown>,
  'useWindowScroll' | 'itemContent' | 'rangeChanged' | 'ref'
>;

function Virtuoso(props: VirtuosoProps) {
  const { data } = props;
  const ref = useRef<VirtuosoHandle>(null);
  const [renderFooter, setRenderFooter] = useState(false);
  const handleItemContent = useCallback(
    (index: number, market: Market) => (
      <PredictionCard
        market={market}
        className={cn({
          'mb-grid': data && index !== data.length - 1
        })}
      />
    ),
    [data]
  );
  const handleRangeChange = useCallback(
    (range: ListRange) => {
      if (range.startIndex > 0) setRenderFooter(true);
      else if (renderFooter) setRenderFooter(false);
    },
    [renderFooter]
  );
  const handleBackClick = useCallback(
    () =>
      ref.current?.scrollToIndex({
        index: 0,
        align: 'start',
        behavior: 'smooth'
      }),
    []
  );

  return (
    <>
      <AnimatePresence>
        {renderFooter && (
          <motion.div
            className="ta-center p-grid bg-to-primary p-sticky w-100% zi-1"
            initial={{ top: window.innerHeight }}
            animate={{ top: window.innerHeight - 104 }}
            exit={{ top: window.innerHeight }}
          >
            <Button variant="outline" onClick={handleBackClick}>
              Back to Top
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <ReactVirtuoso
        ref={ref}
        useWindowScroll
        itemContent={handleItemContent}
        rangeChanged={handleRangeChange}
        {...(renderFooter && {
          style: {
            top: -104
          }
        })}
        {...props}
      />
    </>
  );
}
export default function MarketList() {
  const markets = useMarkets();

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
          success: <Virtuoso data={markets.data} />
        }[markets.state]
      }
    </div>
  );
}
