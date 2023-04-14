import { useEffect } from 'react';

import { Container } from 'ui';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import PortfolioAnalytics from './PortfolioAnalytics';
import PortfolioChart from './PortfolioChart';
import PortfolioTabs from './PortfolioTabs';

export default function PortfolioPage() {
  const dispatch = useAppDispatch();
  const { network } = useNetwork();
  const polkamarkets = useAppSelector(state => state.polkamarkets);
  const portfolio = useAppSelector(state => state.portfolio.portfolio);
  const isLoading = !portfolio.address;

  useEffect(() => {
    (async function handlePortfolio() {
      const { getPortfolio } = await import('redux/ducks/portfolio');

      dispatch(getPortfolio(polkamarkets.ethAddress, network.id));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [polkamarkets.ethAddress, network.id]);

  return (
    <Container className="portfolio-page">
      <PortfolioAnalytics portfolio={portfolio} isLoading={isLoading} />
      <PortfolioChart portfolio={portfolio} isLoading={isLoading} />
      <PortfolioTabs />
    </Container>
  );
}
