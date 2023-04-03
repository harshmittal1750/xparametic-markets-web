import { useEffect } from 'react';

import { Container } from 'ui';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import PortfolioAnalytics from './PortfolioAnalytics';
import PortfolioChart from './PortfolioChart';
import PortfolioTabs from './PortfolioTabs';

export default function PortfolioPage() {
  const dispatch = useAppDispatch();
  const network = useNetwork();
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  useEffect(() => {
    if (ethAddress) {
      (async () => {
        const { getPortfolio } = await import('redux/ducks/portfolio');

        dispatch(getPortfolio(ethAddress, network.network.id));
      })();
    }
  }, [ethAddress, dispatch, network.network.id]);

  return (
    <Container className="portfolio-page">
      <PortfolioAnalytics />
      <PortfolioChart />
      <PortfolioTabs />
    </Container>
  );
}
