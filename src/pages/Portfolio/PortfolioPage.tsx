import { useEffect } from 'react';

import { getPortfolio } from 'redux/ducks/portfolio';
import { Container } from 'ui';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import PortfolioAnalytics from './PortfolioAnalytics';
import PortfolioChart from './PortfolioChart';
import PortfolioTabs from './PortfolioTabs';

const PortfolioPage = () => {
  const dispatch = useAppDispatch();
  const { network } = useNetwork();

  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  useEffect(() => {
    if (ethAddress) {
      dispatch(getPortfolio(ethAddress, network.id));
    }
  }, [ethAddress, dispatch, network.id]);

  return (
    <Container className="portfolio-page">
      <PortfolioAnalytics />
      <PortfolioChart />
      <PortfolioTabs />
    </Container>
  );
};

export default PortfolioPage;
