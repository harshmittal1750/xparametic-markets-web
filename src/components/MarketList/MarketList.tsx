import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
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
function MarketListWrapper({
  children
}: React.PropsWithChildren<Record<string, unknown>>) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return <>{children}</>;
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
  const Root = isTop ? MarketListWrapper : Fragment;

  useEffect(() => {
    function handleDocumentScroll() {
      if (window.scrollY >= Math.floor(rect.top) && !isTop) setTop(true);
    }
    document.addEventListener('scroll', handleDocumentScroll);

    return () => {
      document.removeEventListener('scroll', handleDocumentScroll);
    };
  }, [isTop, rect.top]);

  return (
    <Root>
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
    </Root>
  );
}
