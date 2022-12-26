import { useCallback, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import type { ListRange } from 'react-virtuoso';

import { Market } from 'models/market';
import { useRect } from 'ui';

import { useFooterVisibility } from 'hooks';

import PredictionCard from '../PredictionCard';

type MarketListProps = {
  markets: Market[];
};

export default function MarketList({ markets }: MarketListProps) {
  const [ref, rect] = useRect();
  const footerVisibility = useFooterVisibility();
  const handleRangeChange = useCallback(
    (range: ListRange) => {
      if (markets.length - 1 === range.endIndex) footerVisibility.show();
      else if (footerVisibility.visible) footerVisibility.hide();
    },
    [footerVisibility, markets.length]
  );

  useEffect(() => {
    if (footerVisibility.visible) footerVisibility.hide();

    return () => footerVisibility.show();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      style={{
        // TODO: use {rect.top} to lock body overflow
        height: window.innerHeight
      }}
      className="pm-c-market-list"
    >
      <Virtuoso
        data={markets}
        itemContent={(_index, market) => (
          <div className="pm-c-market-list__item">
            <PredictionCard market={market} />
          </div>
        )}
        rangeChanged={handleRangeChange}
      />
    </div>
  );
}
