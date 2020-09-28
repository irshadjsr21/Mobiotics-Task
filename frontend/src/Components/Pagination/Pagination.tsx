import React, { useEffect, useState } from "react";

import styles from "./pagination.module.scss";

export interface PaginationProps {
  currentPage: number;
  lastPage: number;
  disabled: boolean;
  pageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  lastPage,
  disabled,
  pageChange,
}: PaginationProps) {
  const pageIndex = [-2, -1, 0, +1, +2];
  const [pages, setPages] = useState<number[]>([]);

  const checkBoundry = (page: number) => {
    return page > 0 && page <= lastPage;
  };

  const computePages = () => {
    if (currentPage && lastPage) {
      const computedPages = [];
      for (const page of pageIndex) {
        if (checkBoundry(currentPage + page)) {
          computedPages.push(currentPage + page);
        }
      }
      setPages(computedPages);
    }
  };

  useEffect(() => {
    computePages();
  }, [currentPage, lastPage]);

  if (currentPage && lastPage) {
    return (
      <div className={styles.pagination}>
        <button
          className={styles["pagination-btn"]}
          disabled={disabled || currentPage === 1}
          onClick={() => pageChange(1)}
        >
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => pageChange(page)}
            className={
              page === currentPage
                ? `${styles["pagination-btn"]} ${styles["pagination-btn-active"]}`
                : styles["pagination-btn"]
            }
            disabled={disabled}
          >
            {page}
          </button>
        ))}
        <button
          className={styles["pagination-btn"]}
          onClick={() => pageChange(lastPage)}
          disabled={disabled || currentPage === lastPage}
        >
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </div>
    );
  } else {
    return null;
  }
}
