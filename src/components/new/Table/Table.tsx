/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-curly-newline */
import { CSSProperties, ReactNode, useRef } from 'react';
import { TableVirtuoso, TableVirtuosoHandle } from 'react-virtuoso';

import classNames from 'classnames';

import { AlertMini } from 'components';

export type TableColumnAlign = 'left' | 'center' | 'right';

export type TableColumn = {
  title: string;
  key: string;
  render?: (_value: any) => ReactNode;
  align: TableColumnAlign;
};

export type TableRow = {
  key: string;
  highlight?: boolean;
  [key: string]: any;
};

type TableProps = {
  height: CSSProperties['height'];
  minWidth: CSSProperties['minWidth'];
  columns: TableColumn[];
  rows: TableRow[];
  isLoadingData?: boolean;
  emptyDataDescription?: string;
};

function Table({
  height,
  minWidth,
  columns,
  rows,
  isLoadingData = false,
  emptyDataDescription = 'No data to show.'
}: TableProps) {
  const virtuoso = useRef<TableVirtuosoHandle>(null);

  type ScrollToIndexArgs = {
    index: number;
    align?: 'start' | 'center' | 'end';
  };

  function scrollToIndex({ index, align = 'start' }: ScrollToIndexArgs) {
    if (virtuoso.current) {
      virtuoso.current?.scrollToIndex({
        index,
        align
      });
    }
  }

  return (
    <div className="width-full" style={{ overflowX: 'auto' }}>
      <TableVirtuoso
        ref={virtuoso}
        style={{ height, minWidth }}
        className="width-full border-solid border-1"
        data={rows}
        totalCount={rows.length}
        components={{
          Table: ({ style, ...props }) => (
            <table
              {...props}
              className="width-full"
              style={{
                ...style,
                tableLayout: 'fixed',
                borderCollapse: 'collapse'
              }}
            />
          ),
          TableHead: props => (
            <thead
              {...props}
              style={{ position: 'sticky', zIndex: 10, top: '0px' }}
            />
          ),
          TableRow: props => {
            const index = props['data-index'];
            const row = rows[index];

            return (
              <tr
                {...props}
                className={classNames({
                  'bg-1 bg-3-on-hover': !row.highlight,
                  'bg-primary-10': row.highlight,
                  'border-solid-top border-1': true
                })}
              />
            );
          },
          EmptyPlaceholder: () => {
            return (
              <div className="absolute flex-row justify-center align-center width-full margin-top-12 padding-y-12 padding-x-4">
                {!isLoadingData ? (
                  <AlertMini
                    style={{ border: 'none' }}
                    styles="outline"
                    variant="information"
                    description={emptyDataDescription}
                  />
                ) : (
                  <div className="spinner--primary" />
                )}
              </div>
            );
          }
        }}
        fixedHeaderContent={() => (
          <tr className="border-solid-bottom border-1">
            {columns?.map(column => (
              <th
                key={column.key}
                scope="col"
                className={`bg-3 padding-y-4 padding-x-5 tiny bold text-3 align-middle whitespace-nowrap text-${column.align}`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        )}
        itemContent={(_index, row) => {
          return columns.map(column => (
            <td
              key={`${column.key}${row.key}`}
              className={`padding-y-6 padding-x-5 caption semibold text-1 align-middle whitespace-normal text-${column.align}`}
            >
              {column.render ? column.render(row[column.key]) : row[column.key]}
            </td>
          ));
        }}
      />
    </div>
  );
}

export default Table;
