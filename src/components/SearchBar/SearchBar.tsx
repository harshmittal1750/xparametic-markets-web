import cn from 'classnames';

import { SearchIcon } from 'assets/icons';

import { SearchBarProps } from './SearchBar.type';

/**
 * A search bar with standard search input
 */
function SearchBar({ className, onSearch, ...props }: SearchBarProps) {
  return (
    <form
      role="search"
      className={cn('pm-c-searchbar', className?.form)}
      onSubmit={onSearch}
    >
      <input
        type="text"
        role="searchbox"
        autoComplete="off"
        className={cn('pm-c-searchbar__input', className?.input)}
        {...props}
      />
      <button
        type="submit"
        aria-label="Search"
        className={cn('pm-c-searchbar__icon', className?.button)}
      >
        <SearchIcon />
      </button>
    </form>
  );
}

export default SearchBar;
