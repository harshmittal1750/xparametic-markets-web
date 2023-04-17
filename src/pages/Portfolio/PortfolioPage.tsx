import { useEffect } from 'react';

import { Container } from 'ui';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import PortfolioAnalytics from './PortfolioAnalytics';
import PortfolioChart from './PortfolioChart';
import PortfolioTabs from './PortfolioTabs';

export default function PortfolioPage() {
  const dispatch = useAppDispatch();
  const { network } = useNetwork();
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);
  const isLoading = useAppSelector(
    state => state.polkamarkets.isLoading.portfolio
  );

  useEffect(() => {
    (async function handlePortfolio() {
      const { getPortfolio } = await import('redux/ducks/portfolio');

      dispatch(getPortfolio(ethAddress, network.id));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethAddress, network.id]);

  return (
    <Container className="portfolio-page">
      <PortfolioAnalytics isLoading={isLoading} />
      <PortfolioChart isLoading={isLoading} />
      <PortfolioTabs />
    </Container>
  );
}
