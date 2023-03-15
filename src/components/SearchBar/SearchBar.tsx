import { useRef, useCallback, FormEvent } from 'react';

import cn from 'classnames';

import { SearchIcon } from 'assets/icons';

import { SearchBarProps } from './SearchBar.type';

function SearchBar({
  className,
  onChange,
  onSearch,
  ...props
}: SearchBarProps) {
  const inputElementRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (inputElementRef.current && onSearch) {
        onSearch(inputElementRef.current.value);
      }
    },
    [onSearch]
  );

  const handleChange = useCallback(() => {
    if (inputElementRef.current && onChange) {
      onChange(inputElementRef.current.value);
    }
  }, [onChange]);

  return (
    <form
      role="search"
      className={cn('pm-c-searchbar', className?.form)}
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        aria-label="Search"
        className={cn('pm-c-searchbar__icon', className?.button)}
      >
        <SearchIcon />
      </button>
      <input
        ref={inputElementRef}
        type="text"
        role="searchbox"
        autoComplete="off"
        className={cn('pm-c-searchbar__input', className?.input)}
        onChange={handleChange}
        {...props}
      />
    </form>
  );
}

export default SearchBar;
