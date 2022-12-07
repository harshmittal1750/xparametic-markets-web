import { useState, useMemo, memo, useCallback } from 'react';

import { isEmpty } from 'lodash';
import { setFilter } from 'redux/ducks/portfolio';
import { useGetMarketsByIdsQuery } from 'services/Polkamarkets';
import { useMedia } from 'ui';

import { ButtonGroup, PortfolioMarketTable, Filter } from 'components';

import { useAppSelector, useAppDispatch, useNetwork } from 'hooks';

import { formatMarketPositions } from './utils';

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

const responsiveMarkets = ['market', 'outcome', 'profit'];

function useResponsivePositions({ headers, rows }) {
  const handleHeaders = useCallback(
    header =>
      header.key === 'market' ||
      header.key === 'outcome' ||
      header.key === 'profit',
    []
  );
  const handleRows = useCallback(
    (row, index) =>
      Object.keys(row)
        .filter(key => responsiveMarkets.includes(key))
        .reduce(
          (acc, key) => ({
            ...acc,
            [key]: rows[index][key]
          }),
          {}
        ),
    [rows]
  );

  return {
    headers: headers.filter(handleHeaders),
    rows: rows.map(handleRows)
  };
}

const PortfolioTabsFilter = memo(TabsFilter);

function PortfolioTabs() {
  const { network } = useNetwork();
  const [currentTab, setCurrentTab] = useState('marketPositions');
  const isDesktop = useMedia('(min-width: 1024px)');
  const {
    portfolio,
    actions,
    marketsWithActions,
    marketsWithBonds,
    isLoading
  } = useAppSelector(state => state.polkamarkets);

  const { portfolio: isLoadingPortfolio, actions: isLoadingActions } =
    isLoading;

  const marketsIds = [...marketsWithActions, ...marketsWithBonds];

  const { data: markets, isLoading: isLoadingMarkets } =
    useGetMarketsByIdsQuery(
      {
        ids: marketsIds,
        networkId: network.id
      },
      {
        skip: isLoadingActions || isEmpty(marketsIds)
      }
    );
  const marketPositions = useMemo(
    () => formatMarketPositions(portfolio, actions, markets),
    [actions, markets, portfolio]
  );
  const responsivePositions = useResponsivePositions(marketPositions);
  const positions = isDesktop ? marketPositions : responsivePositions;

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
            rows={positions.rows}
            headers={positions.headers}
            isLoadingData={
              isLoadingMarkets || isLoadingPortfolio || isLoadingActions
            }
          />
        ) : null}
      </div>
    </div>
  );
}

export default PortfolioTabs;
