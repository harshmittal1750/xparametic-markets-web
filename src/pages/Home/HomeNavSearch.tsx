import { useCallback, useState } from 'react';

import { setSearchQuery } from 'redux/ducks/markets';

import { SearchBar } from 'components';

import { useAppDispatch, useAppSelector } from 'hooks';

export default function HomeNavSearch() {
  const searchQuery = useAppSelector(state => state.markets.searchQuery);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState(() => searchQuery);
  const handleSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(setSearchQuery(searchValue));
    },
    [dispatch, searchValue]
  );
  const handleDispatchSearch = useCallback(
    (value: string) => dispatch(setSearchQuery(value)),
    [dispatch]
  );
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setSearchValue(value);

      if (!value) handleDispatchSearch(value);
    },
    [handleDispatchSearch]
  );

  return (
    <SearchBar
      name="Search Markets"
      placeholder="Search markets"
      className={{ form: 'pm-p-home__navigation__actions' }}
      onSearch={handleSearch}
      onChange={handleSearchChange}
      value={searchValue}
    />
  );
}
