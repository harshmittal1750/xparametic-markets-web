import { useMemo } from 'react';

import { CategoryAnalytics } from 'components';

import { useAppSelector } from 'hooks';

import { formatPortfolioAnalytics } from './utils';

function PortfolioAnalytics() {
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
      {analytics
        ?.filter(analytic => analytic.enabled)
        .map(({ title, value, change, chartData, backgroundColor }) => (
          <li key={title}>
            <CategoryAnalytics
              title={title}
              value={value}
              change={change}
              chartData={chartData}
              backgroundColor={backgroundColor}
            />
          </li>
        ))}
    </ul>
  );
}

PortfolioAnalytics.displayName = 'PortfolioAnalytics';

export default PortfolioAnalytics;
