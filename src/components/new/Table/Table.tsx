import { ReactNode } from 'react';

import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

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
  columns: TableColumn[];
  rows: TableRow[];
  isLoadingData?: boolean;
  emptyDataDescription?: string;
};

function Table({
  columns,
  rows,
  isLoadingData = false,
  emptyDataDescription = 'No data to show.'
}: TableProps) {
  return (
    <>
      <table className="width-full border-solid border-1">
        <thead>
          <tr>
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
        </thead>
        <tbody>
          {rows?.map(row => (
            <tr
              className={classNames({
                'bg-1 bg-3-on-hover': !row.highlight,
                'bg-primary-10': row.highlight,
                'border-solid-top border-1': true
              })}
              key={row.key}
            >
              {columns.map(column => (
                <td
                  key={`${column.key}${row.key}`}
                  className={`padding-y-6 padding-x-5 caption semibold text-1 align-middle whitespace-normal text-${column.align}`}
                >
                  {column.render
                    ? column.render(row[column.key])
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {isEmpty(rows) && isLoadingData ? (
        <div className="flex-row justify-center align-center width-full padding-y-7 padding-x-4">
          <div className="spinner--primary" />
        </div>
      ) : null}

      {isEmpty(rows) && !isLoadingData ? (
        <div className="pm-c-table__empty flex-row justify-center align-center width-full padding-0">
          <AlertMini
            styles="outline"
            variant="information"
            description={emptyDataDescription}
          />
        </div>
      ) : null}
    </>
  );
}

export default Table;
