import { useCallback, useState } from 'react';

import type { SortedOutcomes } from 'helpers/sortOutcomes';

type UseExpandableOutcomes = {
  max?: number;
  truncateMax?: number;
  outcomes: SortedOutcomes;
};

export default function useExpandableOutcomes({
  max = 2,
  truncateMax = 2,
  outcomes
}: UseExpandableOutcomes) {
  const [isExpanded, setExpanded] = useState(false);
  const on = isExpanded ? outcomes : outcomes.slice(0, max);
  const off = isExpanded ? [] : outcomes.slice(max);

  return {
    isExpanded,
    expand: useCallback(() => setExpanded(true), []),
    onseted: on,
    offseted: {
      percent:
        +(
          off
            .map(outcome => outcome.price)
            .reduce((prices, price) => price + prices, 0) / off.length
        ).toFixed(3) * 100,
      primary: `${off.length}+ Outcomes`,
      secondary: `${off
        .slice(0, truncateMax)
        .map(outcome => outcome.title)
        .join(', ')}...`
    }
  } as const;
}
