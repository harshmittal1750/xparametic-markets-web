import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { setSearchQuery } from 'redux/ducks/markets';
import { closeRightSidebar } from 'redux/ducks/ui';
import { ButtonGroup } from 'ui';

import { Button, Icon, IconProps, SearchBar } from 'components';

import { useAppDispatch } from 'hooks';

const filters = ['List', 'Grid'] as Array<IconProps['name']>;

export default function HomeNav() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [filter, setFilter] = useState(0);
  const handleFilter = useCallback(index => () => setFilter(index), []);

  const handleSearch = useCallback(
    (text: string) => {
      dispatch(setSearchQuery(text));
    },
    [dispatch]
  );

  const handleNavigateToCreateMarket = useCallback(() => {
    dispatch(closeRightSidebar());

    history.push('/market/create');
  }, [dispatch, history]);

  return (
    <div className="pm-p-home__navigation">
      <Button
        variant="outline"
        size="sm"
        className="pm-p-home__navigation__actions"
      >
        <Icon name="Filter" />
        Filter
      </Button>
      <SearchBar
        name="Search Markets"
        placeholder="Search markets"
        onSearch={handleSearch}
        className={{ form: 'pm-p-home__navigation__actions' }}
      />
      <ButtonGroup actived={filter} className="pm-p-home__navigation__actions">
        {filters.map((button, index) => (
          <Button
            key={button}
            variant="outline"
            color="default"
            aria-label={`Show by ${button}`}
            onClick={handleFilter(index)}
          >
            <Icon name={button} />
          </Button>
        ))}
      </ButtonGroup>
      <Button
        variant="outline"
        size="xs"
        className="pm-p-home__navigation__actions"
      >
        SORT: LIQUIDITY
        <Icon name="Chevron" dir="down" size="lg" />
      </Button>
      <Button color="primary" size="sm" onClick={handleNavigateToCreateMarket}>
        Create Market
      </Button>
    </div>
  );
}
