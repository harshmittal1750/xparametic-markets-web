import { useCallback } from 'react';

import cn from 'classnames';
import { setSearchQuery, setSorter } from 'redux/ducks/markets';
import { Container, useMedia } from 'ui';

import {
  Button,
  CreateMarket,
  Feature,
  Filter,
  Icon,
  SearchBar
} from 'components';

import { useAppDispatch } from 'hooks';
import useMarkets from 'hooks/useMarkets';

import { filters } from './utils';

export default function HomeNav({ onFilterClick }: { onFilterClick(): void }) {
  const isDesktop = useMedia('(min-width: 1024px)');
  const dispatch = useAppDispatch();
  const markets = useMarkets();
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
    <Container
      $enableGutters
      className={cn('bb-thin d-flex g-12 pm-p-home__navigation')}
    >
      <Button
        variant="outline"
        size="sm"
        className="pm-p-home__navigation__actions"
        onClick={onFilterClick}
        disabled={markets.state === 'loading'}
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
    </Container>
  );
}
