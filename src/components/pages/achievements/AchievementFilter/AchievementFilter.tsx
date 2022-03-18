/* eslint-disable no-unused-vars */
import { useEffect, useState, MouseEvent } from 'react';

import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

export type Item = {
  id: string;
  name: string;
  value: string;
};

type AchievementFilterProps = {
  items?: Item[];
  defaultItemId?: string;
  onChangeItem?: (item: string, value: string) => void;
};

function AchievementFilter({
  items,
  defaultItemId,
  onChangeItem
}: AchievementFilterProps) {
  const [currentItem, setCurrentItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    setCurrentItem(defaultItemId);
  }, [defaultItemId]);

  function handleChangeItem(event: MouseEvent<HTMLButtonElement>) {
    const { id, value } = event.currentTarget;

    if (id !== currentItem && onChangeItem) {
      setCurrentItem(id);
      onChangeItem(id, value);
    }
  }

  return (
    <div className="achievement-filter">
      {!isEmpty(items) ? (
        <div className="achievement-filter__item">
          {items?.map(interval => (
            <button
              key={interval.id}
              id={interval.id}
              className={classNames({
                'achievement-filter__item-item': true,
                active: currentItem === interval.id
              })}
              type="button"
              value={interval.value}
              onClick={event => handleChangeItem(event)}
            >
              {interval.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default AchievementFilter;
