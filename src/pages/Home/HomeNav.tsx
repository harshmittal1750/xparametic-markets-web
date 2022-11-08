import { Button, Icon, SearchBar } from 'components';

export default function HomeNav() {
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
        onSearch={() => {}}
        className="pm-p-home__navigation__actions"
      />
      <Button
        variant="outline"
        size="xs"
        className="pm-p-home__navigation__actions"
      >
        SORT: LIQUIDITY
        <Icon name="Chevron" dir="down" size="lg" />
      </Button>
      <Button color="primary" size="sm">
        Create Market
      </Button>
    </div>
  );
}
