import { useCallback, useMemo, useState } from 'react';

import sortOutcomes from 'helpers/sortOutcomes';
import type { Outcome } from 'models/market';

type UseExpandableOutcomes = {
  max?: number;
  outcomes: Outcome[];
};

export default function useExpandableOutcomes({
  max = 2,
  outcomes
}: UseExpandableOutcomes) {
  const [isExpanded, setExpanded] = useState(outcomes.length < 3);
  const expand = useCallback(() => setExpanded(true), []);
  const sorted = useMemo(
    () =>
      sortOutcomes({
        outcomes,
        timeframe: '7d'
      }),
    [outcomes]
  );
  const seted = useMemo(
    () => ({
      on: sorted.slice(0, isExpanded ? undefined : max),
      off: sorted.slice(isExpanded ? undefined : max)
    }),
    [isExpanded, max, sorted]
  );
  const isSingle = seted.off.length === 1;

  return {
    isExpanded,
    expand,
    onseted: seted.on,
    offseted: {
      percent:
        +(
          seted.off
            .map(outcome => outcome.price)
            .reduce((prices, price) => price + prices, 0) / seted.off.length
        ).toFixed(3) * 100,
      primary: `+${seted.off.length} Outcome${isSingle ? '' : 's'}`,
      secondary: `${seted.off
        .slice(0, 2)
        .map(outcome => outcome.name)
        .join(', ')}${isSingle ? '' : '...'}`
    }
  } as const;
}
