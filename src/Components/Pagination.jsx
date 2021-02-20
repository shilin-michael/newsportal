import React from "react";
import "./Components.scss";

const Pagination = (props) => {
  let {
    total,
    currentPage = 1,
    limit = 5,
    onChangefn,
  } = props;
  let pages = [];
  let maxPages = 10;
  let totalPages = Math.ceil(total / limit);

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage, endPage;
  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    let maxPagesBefore = Math.floor(maxPages / 2);
    let maxPagesAfter = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBefore) {
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfter >= totalPages) {
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBefore;
      endPage = currentPage + maxPagesAfter;
    }
  }

  pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i
  );

  return (
    <div className="pagination">
      <div className="pagewrapper">
        {pages.map((page) => (
          <div
            className={`page ${page == currentPage ? "active" : ""}`}
            onClick={(e) => onChangefn(page)}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
