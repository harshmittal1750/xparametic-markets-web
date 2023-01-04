import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';

import cn from 'classnames';
import type { Market } from 'models/market';

import Footer from 'components/Footer';
import PredictionCard from 'components/PredictionCard';

type MarketListProps = {
  markets: Market[];
};

export default function MarketList({ markets }: MarketListProps) {
  const handleItemContent = useCallback(
    (index: number, data: Market) => (
      <PredictionCard
        market={data}
        className={cn({
          'mb-grid': index !== markets.length - 1
        })}
      />
    ),
    [markets.length]
  );

  return (
    <Virtuoso
      useWindowScroll
      data={markets}
      itemContent={handleItemContent}
      components={{
        Footer
      }}
    />
  );
}
