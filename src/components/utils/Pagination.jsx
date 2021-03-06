import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

function Pagination({ pageCount, onPageChange, currentPage }) {
  return (
    <section className="d-flex justify-content-center align-items-center w-100">
      <ReactPaginate
        previousLabel={'anterior'}
        nextLabel={'siguiente'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        forcePage={currentPage - 1}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </section>
  );
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
