import { useState, memo } from 'react';

import { isEmpty } from 'lodash';
import { setFilter } from 'redux/ducks/portfolio';
import { useGetMarketsByIdsQuery } from 'services/Polkamarkets';

import {
  ButtonGroup,
  PortfolioLiquidityTable,
  PortfolioMarketTable,
  PortfolioReportTable,
  Filter
} from 'components';

import { useAppSelector, useAppDispatch, useNetwork } from 'hooks';

import {
  formatLiquidityPositions,
  formatMarketPositions,
  formatReportPositions
} from './utils';

function TabsFilter() {
  const dispatch = useAppDispatch();

  function handleChangeFilter(newFilter: { value: string; name: string }) {
    dispatch(setFilter(newFilter.value));
  }

  return (
    <Filter
      description="Filter by"
      defaultOption="open"
      options={[
        { value: 'open', name: 'Open' },
        { value: 'resolved', name: 'Resolved' }
      ]}
      onChange={handleChangeFilter}
    />
  );
}

const PortfolioTabsFilter = memo(TabsFilter);

function PortfolioTabs() {
  const { network } = useNetwork();
  const [currentTab, setCurrentTab] = useState('marketPositions');

  const {
    bonds,
    portfolio,
    actions,
    marketsWithActions,
    marketsWithBonds,
    isLoading
  } = useAppSelector(state => state.polkamarkets);

  const { portfolio: isLoadingPortfolio } = isLoading;

  const marketsIds = [...marketsWithActions, ...marketsWithBonds];

  const { data: markets, isLoading: isLoadingMarkets } =
    useGetMarketsByIdsQuery(
      {
        ids: marketsIds,
        networkId: network.id
      },
      { skip: isEmpty(marketsIds) }
    );

  const marketPositions = formatMarketPositions(portfolio, actions, markets);
  const liquidityPositions = formatLiquidityPositions(portfolio, markets);
  const reportPositions = formatReportPositions(bonds, markets);

  return (
    <div className="portfolio-tabs">
      <div className="portfolio-tabs__header">
        <ButtonGroup
          defaultActiveId="marketPositions"
          buttons={[
            {
              id: 'marketPositions',
              name: 'Market Positions',
              color: 'default'
            },
            {
              id: 'liquidityPositions',
              name: 'Liquidity Positions',
              color: 'default'
            },
            {
              id: 'reportPositions',
              name: 'Reports',
              color: 'default'
            }
          ]}
          onChange={setCurrentTab}
          style={{ width: 'fit-content' }}
        />
        <PortfolioTabsFilter />
      </div>
      <div className="portfolio-tabs__content">
        {currentTab === 'marketPositions' ? (
          <PortfolioMarketTable
            rows={marketPositions.rows}
            headers={marketPositions.headers}
            isLoadingData={isLoadingMarkets || isLoadingPortfolio}
          />
        ) : null}
        {currentTab === 'liquidityPositions' ? (
          <PortfolioLiquidityTable
            rows={liquidityPositions.rows}
            headers={liquidityPositions.headers}
            isLoadingData={isLoadingMarkets || isLoadingPortfolio}
          />
        ) : null}
        {currentTab === 'reportPositions' ? (
          <PortfolioReportTable
            rows={reportPositions.rows}
            headers={reportPositions.headers}
            isLoadingData={isLoadingMarkets || isLoadingPortfolio}
          />
        ) : null}
      </div>
    </div>
  );
}

PortfolioTabs.displayName = 'PortfolioTabs';

export default PortfolioTabs;
