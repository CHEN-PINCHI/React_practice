import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange, isCompactPage, fadeState }) => {
  const renderButtons = () => {
    if (!isCompactPage || totalPages <= 5) {
      return Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          type="button"
          className={`pageBtn ${currentPage === i + 1 ? 'active' : ''}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ));
    }

    const delta = 1;
    const pages = [];
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i += 1) {
      range.push(i);
    }

    pages.push(1);
    if (range[0] > 2) pages.push('...');
    pages.push(...range);
    if (range[range.length - 1] < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages.map((page, i) =>
      page === '...' ? (
        <span key={i} className="dots">...</span>
      ) : (
        <button
          key={i}
          type="button"
          className={`pageBtn ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className={`pageBox ${fadeState}`}>
      <button
        type="button"
        className="pageBtn arrow arrowPrev"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {renderButtons()}
      <button
        type="button"
        className="pageBtn arrow arrowNext"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
