import { useHistory } from 'react-router-dom';

import { setFilter } from 'redux/ducks/markets';

import { useAppDispatch } from 'hooks';

import SearchBar from '../SearchBar';

function NavBarSearch() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  function handleSearch(text: string) {
    history.push('/');
    dispatch(setFilter(text));
  }

  return (
    <div className="pm-l-navbar__search">
      <SearchBar
        name="SearchMarkets"
        placeholder="Search markets"
        onSearch={handleSearch}
      />
    </div>
  );
}

NavBarSearch.displayName = 'NavBarSearch';

export default NavBarSearch;
