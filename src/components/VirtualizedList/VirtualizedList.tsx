import { ReactNode, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';

import { Hero } from 'ui';

import heroBanner from 'assets/images/pages/home/illuminate_fantasy_league_banner.png';
import heroLogo from 'assets/images/pages/home/illuminate_fantasy_league_logo.svg';

import { Button } from 'components/Button';
import Text from 'components/Text';

import { useAppDispatch } from 'hooks';

type VirtualizedListProps<T> = {
  height: number | string;
  data?: T[];
  itemContent: (_index: number, _item: T) => ReactNode;
  atBottom?: (_atBottom: boolean) => void;
};

function VirtualizedList<T>({
  height,
  data = [],
  itemContent,
  atBottom
}: VirtualizedListProps<T>) {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [visibleRange, setVisibleRange] = useState({
    startIndex: 0,
    endIndex: 0
  });

  const lastIndex = data.length - 1;

  const isAtBottom =
    visibleRange.startIndex <= lastIndex && lastIndex <= visibleRange.endIndex;

  useEffect(() => {
    atBottom?.(isAtBottom);
  }, [atBottom, isAtBottom]);

  const handleNavigateToDocs = useCallback(() => {
    history.push('/docs');
  }, [dispatch, history]);

  return (
    <Virtuoso
      components={{
        Header: () => (
          <Hero className="pm-p-home__hero" image={heroBanner}>
            <div className="pm-p-home__hero__content">
              <div className="pm-p-home__hero__breadcrumb">
                <Text
                  as="span"
                  scale="tiny-uppercase"
                  fontWeight="semibold"
                  color="white-50"
                >
                  Illuminate Fantasy League / World Cup 2022
                </Text>
              </div>
              <Text
                as="h2"
                fontWeight="bold"
                scale="heading-large"
                color="light"
                className="pm-p-home__hero__heading"
              >
                Place your World Cup predictions to win the IFL Title!
              </Text>
              <Button size="sm" color="primary" onClick={handleNavigateToDocs}>
                About IFL
              </Button>
            </div>
            <img
              alt="Illuminate Fantasy League"
              width={293}
              height={205}
              src={heroLogo}
            />
          </Hero>
        )
      }}
      style={{
        height
      }}
      data={data}
      itemContent={itemContent}
      rangeChanged={setVisibleRange}
    />
  );
}

export default VirtualizedList;
