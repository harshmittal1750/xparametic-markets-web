import React, { useCallback } from 'react';

import cn from 'classnames';

type Interval = {
  id: string;
  name: string;
  value: number;
};

type View = {
  id: string;
  icon: React.ReactNode;
  value: number;
};

type ChartHeaderProps = {
  intervals?: Interval[];
  views?: View[];
  currentInterval?: Interval;
  currentView?: number;
  onChangeInterval?(value: Interval): void;
  onChangeView?(value: number): void;
};

export default function ChartHeader({
  intervals,
  views,
  currentInterval,
  currentView,
  onChangeInterval,
  onChangeView
}: ChartHeaderProps) {
  const handleViewChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      onChangeView?.(+event.currentTarget.value),
    [onChangeView]
  );

  return (
    <div className="chart-header">
      {!!intervals?.length && (
        <div className="chart-header__interval">
          {intervals.map(interval => (
            <button
              key={interval.id}
              className={cn('chart-header__interval-item', {
                active: currentInterval?.value === interval.value
              })}
              type="button"
              value={interval.value}
              onClick={() => onChangeInterval?.(interval)}
            >
              {interval.name}
            </button>
          ))}
        </div>
      )}
      {!!views?.length && (
        <div className="chart-header__view">
          {views?.map(({ value, ...view }) => (
            <button
              key={view.id}
              className={cn('chart-header__view-item', {
                active: currentView === value
              })}
              type="button"
              value={value}
              onClick={handleViewChange}
            >
              {view.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
