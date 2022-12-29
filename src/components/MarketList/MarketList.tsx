import { useCallback, useEffect, useRef, useState } from 'react';
import type { ListRange } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';

import type { Market } from 'models/market';

import PredictionCard from 'components/PredictionCard';

import { useFooterVisibility } from 'hooks';

type MarketListProps = {
  markets: Market[];
  rect: DOMRect;
};

function handleItemContent(_index, market) {
  return <PredictionCard market={market} />;
}
export default function MarketList({ markets, rect }: MarketListProps) {
  const footerVisibility = useFooterVisibility();
  const [isTop, setTop] = useState(false);
  const prevTop = useRef(0);
  const handleRangeChange = useCallback(
    (range: ListRange) => {
      if (markets.length - 1 === range.endIndex) footerVisibility.show();
      else if (footerVisibility.visible) footerVisibility.hide();
    },
    [markets.length, footerVisibility]
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
    <Virtuoso
      onScroll={handleVirtuosoScroll}
      rangeChanged={handleRangeChange}
      data={markets}
      itemContent={handleItemContent}
      {...(!isTop && {
        style: { overflowY: 'hidden' }
      })}
    />
  );
}
