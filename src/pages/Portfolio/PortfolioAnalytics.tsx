import { useMemo } from 'react';

import { Skeleton } from 'ui';

import { CategoryAnalytics } from 'components';

import type { PortfolioAsyncProps } from './type';
import { formatPortfolioAnalytics } from './utils';

export default function PortfolioAnalytics({
  isLoading,
  portfolio
}: PortfolioAsyncProps) {
  const analytics = useMemo(
    () =>
      formatPortfolioAnalytics(
        portfolio.closedMarketsProfit,
        portfolio.openPositions,
        portfolio.liquidityProvided,
        portfolio.liquidityFeesEarned,
        '€'
      ),
    [
      portfolio.closedMarketsProfit,
      portfolio.liquidityFeesEarned,
      portfolio.liquidityProvided,
      portfolio.openPositions
    ]
  );

  return (
    <ul className="portfolio-page__analytics">
      {(() => {
        if (isLoading)
          return [0, 1, 2, 3].map(skeleton => (
            <Skeleton key={skeleton} style={{ height: 104 }} />
          ));
        return analytics
          ?.filter(analytic => analytic.enabled)
          .map(analytic => (
            <li key={analytic.title}>
              <CategoryAnalytics {...analytic} />
            </li>
          ));
      })()}
    </ul>
  );
}
