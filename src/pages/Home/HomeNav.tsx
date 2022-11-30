import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  setSearchQuery,
  setSorter
  // setSorterByEndingSoon
} from 'redux/ducks/markets';
import { closeRightSidebar } from 'redux/ducks/ui';
import { useMedia } from 'ui';

import { Button, Filter, SearchBar } from 'components';
import Feature from 'components/Feature';

import { useAppDispatch } from 'hooks';

import HomeNavFilter from './HomeNavFilter';
import { filters } from './utils';

function CreateMarket() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleNavigateToCreateMarket = useCallback(() => {
    dispatch(closeRightSidebar());
    history.push('/market/create');
  }, [dispatch, history]);

  return (
    <Button color="primary" size="sm" onClick={handleNavigateToCreateMarket}>
      Create Market
    </Button>
  );
}

export default function HomeNav() {
  const isDesktop = useMedia('(min-width: 1024px)');
  const dispatch = useAppDispatch();

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

  return (
    <div className="pm-p-home__navigation">
      <HomeNavFilter isDesktop={isDesktop} />
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
      {isDesktop ? (
        <Feature name="regular">
          <CreateMarket />
        </Feature>
      ) : null}
    </div>
  );
}
