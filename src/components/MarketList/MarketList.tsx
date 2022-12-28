import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import type { ListRange } from 'react-virtuoso';

import { Market } from 'models/market';
import { useRect } from 'ui';

import { useFooterVisibility } from 'hooks';

import PredictionCard from '../PredictionCard';

type MarketListProps = {
  markets: Market[];
};

export default memo(function MarketList({ markets }: MarketListProps) {
  const [isTop, setTop] = useState(false);
  const prevTop = useRef(0);
  const [ref, rect] = useRect();
  const footerVisibility = useFooterVisibility();
  const handleRangeChange = useCallback(
    (range: ListRange) => {
      if (markets.length - 1 === range.endIndex) footerVisibility.show();
      else if (footerVisibility.visible) footerVisibility.hide();
    },
    [footerVisibility, markets.length]
  );
  const handleVirtuosoScroll = useCallback(
    (event: React.UIEvent<'div', UIEvent>) => {
      const { scrollTop } = event.target as HTMLDivElement;

      if (prevTop.current > scrollTop && !scrollTop && isTop) setTop(false);

      prevTop.current = scrollTop;
    },
    [isTop]
  );

  useEffect(() => {
    if (footerVisibility.visible) footerVisibility.hide();

    return () => footerVisibility.show();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    function handleDocumentScroll() {
      if (window.scrollY >= Math.floor(rect.top) && !isTop) setTop(true);
    }
    document.addEventListener('scroll', handleDocumentScroll);

    return () => {
      document.removeEventListener('scroll', handleDocumentScroll);
    };
  }, [isTop, rect.top]);
  useEffect(() => {
    if (!isTop) return () => null;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isTop]);

  return (
    <div
      ref={ref}
      style={{
        height: window.innerHeight
      }}
      className="pm-c-market-list"
    >
      <Virtuoso
        onScroll={handleVirtuosoScroll}
        data={markets}
        rangeChanged={handleRangeChange}
        itemContent={(_index, market) => (
          <div className="pm-c-market-list__item">
            <PredictionCard market={market} />
          </div>
        )}
        {...(!isTop && {
          style: { overflowY: 'hidden' }
        })}
      />
    </div>
  );
});
