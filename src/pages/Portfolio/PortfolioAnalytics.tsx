import { useMemo } from 'react';

import { CategoryAnalytics } from 'components';

import { useAppSelector } from 'hooks';

import { formatPortfolioAnalytics } from './utils';

function PortfolioAnalytics() {
  const portfolio = useAppSelector(state => state.portfolio.portfolio);
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
      {analytics
        ?.filter(analytic => analytic.enabled)
        .map(analytic => (
          <li key={analytic.title}>
            <CategoryAnalytics {...analytic} />
          </li>
        ))}
    </ul>
  );
}

PortfolioAnalytics.displayName = 'PortfolioAnalytics';

export default PortfolioAnalytics;
