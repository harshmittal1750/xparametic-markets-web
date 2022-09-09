import { ReactNode } from 'react';
import { Virtuoso } from 'react-virtuoso';

type VirtualizedListProps<T> = {
  height: number | string;
  data?: T[];
  itemContent: (_index: number, _item: T) => ReactNode;
};

function VirtualizedList<T>({
  height,
  data,
  itemContent
}: VirtualizedListProps<T>) {
  return (
    <Virtuoso
      style={{
        height
      }}
      data={data}
      itemContent={itemContent}
    />
  );
}

export default VirtualizedList;
