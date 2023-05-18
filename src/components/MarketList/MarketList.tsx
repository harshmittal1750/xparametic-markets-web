import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  VirtuosoProps as ReactVirtuosoProps,
  VirtuosoHandle,
  ListRange
} from 'react-virtuoso';
import { Virtuoso as ReactVirtuoso } from 'react-virtuoso';

import { AnimatePresence, motion } from 'framer-motion';
import type { Market } from 'models/market';
import { useRect, useTheme } from 'ui';

import { InfoIcon } from 'assets/icons';

import PredictionCard from 'components/PredictionCard';

import useMarkets from 'hooks/useMarkets';

import { Button } from '../Button';
import Text from '../Text';
import marketListClasses from './MarketList.module.scss';

type VirtuosoProps = Omit<
  ReactVirtuosoProps<Market, unknown>,
  'useWindowScroll' | 'itemContent' | 'rangeChanged' | 'ref'
>;

function Virtuoso({ data }: VirtuosoProps) {
  const theme = useTheme();
  const [back, backRect] = useRect();
  const HEIGHT = theme.device.isDesktop
    ? `${backRect.height}px`
    : `calc(${backRect.height}px + var(--header-y))`;
  const virtuoso = useRef<VirtuosoHandle>(null);
  const [renderBack, setRenderBack] = useState(false);
  const handleItemContent = useCallback(
    (index: number, market: Market) => (
      <PredictionCard
        market={market}
        $gutter={data && index !== data.length - 1}
      />
    ),
    [data]
  );
  const handleRangeChange = useCallback(
    (range: ListRange) => {
      if (range.startIndex > 0) setRenderBack(true);
      else if (renderBack) setRenderBack(false);
    },
    [renderBack]
  );
  const handleBackClick = useCallback(
    () =>
      virtuoso.current?.scrollToIndex({
        index: 0,
        align: 'start',
        behavior: 'smooth'
      }),
    []
  );

  return (
    <>
      <AnimatePresence>
        {renderBack && (
          <motion.div
            ref={back}
            className={marketListClasses.backRoot}
            initial={{ top: window.innerHeight }}
            animate={{
              top: `calc(${window.innerHeight}px - ${HEIGHT})`
            }}
            exit={{ top: window.innerHeight }}
          >
            <Button variant="ghost" size="xs" onClick={handleBackClick}>
              Back to Top
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <ReactVirtuoso
        ref={virtuoso}
        useWindowScroll
        itemContent={handleItemContent}
        rangeChanged={handleRangeChange}
        data={data}
        style={{ top: renderBack ? -backRect.height : '' }}
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
    <div className="pm-c-market-list max-width-screen-xl">
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
