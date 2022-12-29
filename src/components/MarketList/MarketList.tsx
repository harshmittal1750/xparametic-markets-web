import { useCallback, useEffect, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import type { Market } from 'models/market';

import Footer from 'components/Footer';
import PredictionCard from 'components/PredictionCard';

type MarketListProps = {
  markets: Market[];
  rect: DOMRect;
};

function handleItemContent(_index, market) {
  return <PredictionCard market={market} />;
}
export default function MarketList({ markets, rect }: MarketListProps) {
  const [isTop, setTop] = useState(false);
  const prevTop = useRef(0);
  const handleVirtuosoScroll = useCallback(
    (event: React.UIEvent<'div', UIEvent>) => {
      const { scrollTop } = event.target as HTMLDivElement;

      if (prevTop.current > scrollTop && !scrollTop && isTop) setTop(false);

      prevTop.current = scrollTop;
    },
    [isTop]
  );

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
      data={markets}
      itemContent={handleItemContent}
      components={{
        Footer
      }}
      {...(!isTop && {
        style: { overflowY: 'hidden' }
      })}
    />
  );
}
