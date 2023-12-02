// Pagination.jsx
import React, { useState, useEffect } from "react";
import "./Pagination.css";

const Pagination = ({ totalRecords, recordsPerPage, onPageChanged }) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onPageChanged(currentPage);
  }, [currentPage, onPageChanged]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <span className="page-display">
        Page <span className="page-display-span">{currentPage}</span> of{" "}
        {totalPages}
      </span>
      <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
        &lt;&lt;
      </button>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
