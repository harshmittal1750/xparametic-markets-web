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
  const analytics = formatPortfolioAnalytics(
    closedMarketsProfit,
    openPositions,
    liquidityProvided,
    liquidityFeesEarned,
    '€'
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
