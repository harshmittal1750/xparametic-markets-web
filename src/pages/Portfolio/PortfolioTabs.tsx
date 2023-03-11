import { useState, useMemo, memo } from 'react';

import { ui, features } from 'config';
import { isEmpty } from 'lodash';
import { setFilter } from 'redux/ducks/portfolio';
import { useGetMarketsByIdsQuery } from 'services/Polkamarkets';
import { useTheme } from 'ui';

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
      description="Filter:"
      defaultOption="open"
      options={[
        { value: 'open', name: 'Open' },
        { value: 'resolved', name: 'Resolved' }
      ]}
      onChange={handleChangeFilter}
      className="portfolio-tabs__header-filter"
    />
  );
}

const defaultColsArr = ['market', 'outcome', 'profit'];
const getDefaultCols = ({ headers, rows }) => ({
  headers: headers.filter(({ key }) => defaultColsArr.includes(key)),
  rows: rows.map((row: {}, index: number) =>
    Object.keys(row)
      .filter(key => defaultColsArr.includes(key))
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]: rows[index][key]
        }),
        {}
      )
  )
});

const PortfolioTabsFilter = memo(TabsFilter);

function PortfolioTabs() {
  const { network } = useNetwork();
  const [currentTab, setCurrentTab] = useState('marketPositions');
  const theme = useTheme();
  const {
    bonds,
    portfolio,
    actions,
    marketsWithActions,
    marketsWithBonds,
    isLoading
  } = useAppSelector(state => state.polkamarkets);

  const {
    portfolio: isLoadingPortfolio,
    bonds: isLoadingBonds,
    actions: isLoadingActions
  } = isLoading;

  const marketsIds = [...marketsWithActions, ...marketsWithBonds];

  const { data: markets, isLoading: isLoadingMarkets } =
    useGetMarketsByIdsQuery(
      {
        ids: marketsIds,
        networkId: network.id
      },
      {
        skip:
          (ui.portfolio.tabs.reportPositions.enabled && isLoadingBonds) ||
          isLoadingActions ||
          isEmpty(marketsIds)
      }
    );

  const marketPositions = useMemo(
    () => formatMarketPositions(portfolio, actions, markets),
    [actions, markets, portfolio]
  );

  const liquidityPositions = useMemo(() => {
    if (ui.portfolio.tabs.liquidityPositions.enabled) {
      return formatLiquidityPositions(portfolio, markets);
    }

    return undefined;
  }, [markets, portfolio]);

  const reportPositions = useMemo(() => {
    if (ui.portfolio.tabs.reportPositions.enabled) {
      return formatReportPositions(bonds, markets);
    }

    return undefined;
  }, [bonds, markets]);

  const positions = theme.device.type.isDesktop
    ? marketPositions
    : getDefaultCols(marketPositions);

  return (
    <div className="portfolio-tabs">
      <div className="portfolio-tabs__header">
        {features.regular.enabled ? (
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
        ) : null}
        <PortfolioTabsFilter />
      </div>
      <div className="portfolio-tabs__content">
        {currentTab === 'marketPositions' ? (
          <PortfolioMarketTable
            rows={positions.rows}
            headers={positions.headers}
            isLoadingData={
              isLoadingMarkets || isLoadingPortfolio || isLoadingActions
            }
          />
        ) : null}
        {liquidityPositions && currentTab === 'liquidityPositions' ? (
          <PortfolioLiquidityTable
            rows={liquidityPositions.rows}
            headers={liquidityPositions.headers}
            isLoadingData={isLoadingMarkets || isLoadingPortfolio}
          />
        ) : null}
        {reportPositions && currentTab === 'reportPositions' ? (
          <PortfolioReportTable
            rows={reportPositions.rows}
            headers={reportPositions.headers}
            isLoadingData={
              isLoadingMarkets || isLoadingPortfolio || isLoadingBonds
            }
          />
        ) : null}
      </div>
    </div>
  );
}

export default PortfolioTabs;
