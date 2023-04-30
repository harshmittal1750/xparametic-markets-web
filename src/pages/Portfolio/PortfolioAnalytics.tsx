import { useMemo } from 'react';

import { Skeleton } from 'ui';

import { CategoryAnalytics } from 'components';

import { useAppSelector } from 'hooks';

import type { PortfolioAsyncProps } from './type';
import { formatPortfolioAnalytics } from './utils';

export default function PortfolioAnalytics({ isLoading }: PortfolioAsyncProps) {
  const closedMarketsProfit = useAppSelector(
    state => state.portfolio.portfolio.closedMarketsProfit
  );
  const openPositions = useAppSelector(
    state => state.portfolio.portfolio.openPositions
  );
  const liquidityProvided = useAppSelector(
    state => state.portfolio.portfolio.liquidityProvided
  );
  const liquidityFeesEarned = useAppSelector(
    state => state.portfolio.portfolio.liquidityFeesEarned
  );
  const analytics = useMemo(
    () =>
      formatPortfolioAnalytics(
        closedMarketsProfit,
        openPositions,
        liquidityProvided,
        liquidityFeesEarned,
        '€'
      ),
    [closedMarketsProfit, liquidityFeesEarned, liquidityProvided, openPositions]
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
