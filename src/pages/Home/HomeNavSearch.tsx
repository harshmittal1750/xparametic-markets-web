import { useCallback } from 'react';

import { setSearchQuery } from 'redux/ducks/markets';

import { SearchBar } from 'components';

import { useAppDispatch } from 'hooks';

export default function HomeNavSearch() {
  const dispatch = useAppDispatch();

  const handleSearch = useCallback(
    (value: string) => {
      dispatch(setSearchQuery(value));
    },
    [dispatch]
  );

  return (
    <SearchBar
      name="Search Markets"
      placeholder="Search markets"
      className={{ form: 'pm-p-home__navigation__actions' }}
      onSearch={handleSearch}
    />
  );
}
