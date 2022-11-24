import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  setSearchQuery,
  setSorter
  // setSorterByEndingSoon
} from 'redux/ducks/markets';
import { closeRightSidebar } from 'redux/ducks/ui';

import { Button, Filter, SearchBar } from 'components';
import Feature from 'components/Feature';

import { useAppDispatch } from 'hooks';

import HomeNavFilter from './HomeNavFilter';
import { filters } from './utils';

export default function HomeNav() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  // const handleTouchedFilter = useCallback(
  //   (touched: boolean) => {
  //     dispatch(setSorterByEndingSoon(!touched));
  //   },
  //   [dispatch]
  // );

  function handleSelectedFilter(filter: {
    value: string | number;
    optionalTrigger?: string;
  }) {
    dispatch(
      setSorter({ value: filter.value, sortBy: filter.optionalTrigger })
    );
  }

  const handleSearch = useCallback(
    (text: string) => {
      dispatch(setSearchQuery(text));
    },
    [dispatch]
  );

  const handleNavigateToCreateMarket = useCallback(() => {
    dispatch(closeRightSidebar());

    history.push('/market/create');
  }, [dispatch, history]);

  return (
    <div className="pm-p-home__navigation">
      <HomeNavFilter />
      <SearchBar
        name="Search Markets"
        placeholder="Search markets"
        onSearch={handleSearch}
        className={{ form: 'pm-p-home__navigation__actions' }}
      />
      <Filter
        description="Sort by"
        defaultOption="expiresAt"
        options={filters}
        onChange={handleSelectedFilter}
        // onTouch={handleTouchedFilter}
        className="pm-p-home__navigation__actions"
      />
      <Feature name="regular">
        <Button
          color="primary"
          size="sm"
          onClick={handleNavigateToCreateMarket}
        >
          Create Market
        </Button>
      </Feature>
    </div>
  );
}
