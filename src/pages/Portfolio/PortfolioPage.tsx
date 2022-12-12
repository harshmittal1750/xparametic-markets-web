import { useEffect } from 'react';

import { getPortfolio } from 'redux/ducks/portfolio';
import { closeRightSidebar } from 'redux/ducks/ui';

import { SEO } from 'components';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import PortfolioAnalytics from './PortfolioAnalytics';
import PortfolioChart from './PortfolioChart';
import PortfolioTabs from './PortfolioTabs';

const IFL_META_PORTFOLIO = `${process.env.PUBLIC_URL}/ifl_meta_portfolio.png`;

const PortfolioPage = () => {
  const dispatch = useAppDispatch();
  const { network } = useNetwork();

  const rightSidebarIsVisible = useAppSelector(
    state => state.ui.rightSidebar.visible
  );

  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  useEffect(() => {
    if (rightSidebarIsVisible) {
      dispatch(closeRightSidebar());
    }
  }, [rightSidebarIsVisible, dispatch]);

  useEffect(() => {
    if (ethAddress) {
      dispatch(getPortfolio(ethAddress, network.id));
    }
  }, [ethAddress, dispatch, network.id]);

  return (
    <div className="portfolio-page">
      <SEO
        title="Portfolio - Illuminate Fantasy League, powered by Polkamarkets"
        description="Participate in the Illuminate Fantasy League and compete with your friends, coworkers or other community members. Predict Football World Cup match winners and manage your portfolio outcome shares with a seamless and user friendly page."
        imageUrl={IFL_META_PORTFOLIO}
      />
      <PortfolioAnalytics />
      <PortfolioChart />
      <PortfolioTabs />
    </div>
  );
};

export default PortfolioPage;
