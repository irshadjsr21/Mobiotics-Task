/* tslint:disable:jsx-no-lambda */
import React from "react";

import styles from "./table.module.scss";

export interface ColumnType {
  name: string;
  isSortable: boolean;
  key?: string;
}

export interface TableProps {
  columns: ColumnType[];
  sort: (column: ColumnType) => void;
  children: React.ReactNode;
  sortData: { column?: ColumnType; asc: boolean };
  isLoading: boolean;
}

export default function Table({ columns, sort, children, sortData, isLoading }: TableProps) {
  const buildHeaders = () => {
    return columns.map((column) => (
      <th key={column.name}>
        {column.isSortable ? (
          <button onClick={() => sort(column)} className="btn-reset p-0">
            {!sortData.column || sortData.column.name !== column.name ? (
              <span>{column.name}</span>
            ) : null}

            {sortData.column && sortData.column.name === column.name ? (
              <div className="flex align-items-center">
                <span className="mr-8">{column.name}</span>
                <span>
                  {sortData.asc ? (
                    <i className="material-icons">keyboard_arrow_down</i>
                  ) : (
                    <i className="material-icons">keyboard_arrow_up</i>
                  )}
                </span>
              </div>
            ) : null}
          </button>
        ) : (
          <span>{column.name}</span>
        )}
      </th>
    ));
  };

  return (
    <div className={styles["table-container"]}>
      <table
        className={`${styles.table} ${styles["table-striped"]} ${
          isLoading ? styles["table-loading"] : ""
        }`}
      >
        <thead>
          <tr className={styles["table-header"]}>{buildHeaders()}</tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
