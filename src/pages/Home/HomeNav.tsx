import { useCallback } from 'react';

import { setSorter } from 'redux/ducks/markets';
import { useTheme } from 'ui';

import { Button, CreateMarket, Feature, Filter, Icon } from 'components';
import { FilterProps } from 'components/Filter/Filter';

import { useAppDispatch } from 'hooks';
import useMarkets from 'hooks/useMarkets';

import HomeNavSearch from './HomeNavSearch';
import { filters } from './utils';

type HomeNavProps = {
  onFilterClick(): void;
};

export default function HomeNav({ onFilterClick }: HomeNavProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const markets = useMarkets();
  const handleSelectedFilter: FilterProps['onChange'] = useCallback(
    filter => {
      dispatch(
        setSorter({ value: filter.value, sortBy: filter.optionalTrigger })
      );
    },
    [dispatch]
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="pm-p-home__navigation__actions"
        onClick={onFilterClick}
        disabled={markets.state !== 'success'}
      >
        <Icon
          name="Filter"
          {...(!theme.device.isDesktop && {
            title: 'Filter'
          })}
        />
        {theme.device.isDesktop && 'Filter'}
      </Button>
      <HomeNavSearch />
      <Filter
        description="Sort by"
        defaultOption="expiresAt"
        options={filters}
        onChange={handleSelectedFilter}
        className="pm-p-home__navigation__actions"
      />
      {theme.device.isDesktop && (
        <Feature name="regular">
          <CreateMarket />
        </Feature>
      )}
    </>
  );
}
