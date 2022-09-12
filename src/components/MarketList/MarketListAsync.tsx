import { useEffect, memo } from 'react';

import isEmpty from 'lodash/isEmpty';
import { Market } from 'models/market';
import { useAppDispatch } from 'redux/store';

import { InfoIcon } from 'assets/icons';

import { Button } from 'components/Button';

import { useAppSelector } from 'hooks';

import PredictionCard from '../PredictionCard';
import Text from '../Text';
import VirtualizedList from '../VirtualizedList';

type MarketListAsyncProps = {
  id: string;
  asyncAction: any;
  filterBy: any;
  markets: Market[];
};

const MarketListAsync = ({
  id,
  asyncAction,
  filterBy,
  markets
}: MarketListAsyncProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.markets);

  useEffect(() => {
    if (!isEmpty(filterBy)) {
      dispatch(asyncAction(filterBy));
    }
  }, [dispatch, asyncAction, filterBy]);

  function refreshMarkets() {
    if (!isEmpty(filterBy)) {
      dispatch(asyncAction(filterBy));
    }
  }

  if (isLoading[id])
    return (
      <div className="pm-c-market-list__empty-state">
        <div className="pm-c-market-list__empty-state__body">
          <span className="spinner--primary" />
        </div>
      </div>
    );

  if (error[id] && error[id].message !== 'canceled') {
    return (
      <div className="pm-c-market-list__error">
        <div className="pm-c-market-list__error__body">
          <InfoIcon />
          <Text
            as="p"
            scale="tiny"
            fontWeight="semibold"
            className="pm-c-market-list__empty-state__body-description"
          >
            Error fetching markets
          </Text>
        </div>
        <div className="pm-c-market-list__error__actions">
          <Button color="primary" size="sm" onClick={refreshMarkets}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (isEmpty(markets)) {
    return (
      <div className="pm-c-market-list__empty-state">
        <div className="pm-c-market-list__empty-state__body">
          <InfoIcon />
          <Text
            as="p"
            scale="tiny"
            fontWeight="semibold"
            className="pm-c-market-list__empty-state__body-description"
          >
            There are no available markets for this category.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="pm-c-market-list">
      <VirtualizedList
        height="100%"
        data={markets}
        itemContent={(_index, market) => (
          <div className="pm-c-market-list__item">
            <PredictionCard market={market} />
          </div>
        )}
      />
    </div>
  );
};

export default memo(MarketListAsync);
