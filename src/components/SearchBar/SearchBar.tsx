import cn from 'classnames';

import { SearchIcon } from 'assets/icons';

import { SearchBarProps } from './SearchBar.type';

/**
 * A search bar with standard search input
 */
function SearchBar({
  size = 'md',
  className,
  onSearch,
  ...props
}: SearchBarProps) {
  return (
    <form
      role="search"
      className={cn('pm-c-searchbar', className?.form, {
        'pm-c-searchbar--sm': size === 'sm',
        'pm-c-searchbar--md': size === 'md'
      })}
      onSubmit={onSearch}
    >
      <button
        type="submit"
        aria-label="Search"
        className={cn('pm-c-searchbar__icon', className?.button)}
      >
        <SearchIcon />
      </button>
      <input
        type="text"
        role="searchbox"
        autoComplete="off"
        className={cn('pm-c-searchbar__input', className?.input)}
        {...props}
      />
    </form>
  );
}

export default SearchBar;
