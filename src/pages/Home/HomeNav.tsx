import { useCallback } from 'react';

import { setSearchQuery, setSorter } from 'redux/ducks/markets';

import {
  Button,
  CreateMarket,
  Feature,
  Filter,
  Icon,
  SearchBar
} from 'components';

import { useAppDispatch, useAppSelector } from 'hooks';

import { filters } from './utils';

export default function HomeNav({
  onFilterClick,
  isDesktop
}: {
  onFilterClick(): void;
  isDesktop: boolean;
}) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state =>
    Object.values(state.markets.isLoading).some(Boolean)
  );
  const handleSearch = useCallback(
    (text: string) => {
      dispatch(setSearchQuery(text));
    },
    [dispatch]
  );
  const handleSelectedFilter = useCallback(
    (filter: { value: string | number; optionalTrigger?: string }) => {
      dispatch(
        setSorter({ value: filter.value, sortBy: filter.optionalTrigger })
      );
    },
    [dispatch]
  );

  return (
    <div className="pm-p-home__navigation">
      <Button
        variant="outline"
        size="sm"
        className="pm-p-home__navigation__actions"
        onClick={onFilterClick}
        disabled={isLoading}
        {...(!isDesktop && { 'aria-label': 'Filter' })}
      >
        <Icon name="Filter" />
        {isDesktop && 'Filter'}
      </Button>
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
        className="pm-p-home__navigation__actions"
      />
      {isDesktop && (
        <Feature name="regular">
          <CreateMarket />
        </Feature>
      )}
    </div>
  );
}
