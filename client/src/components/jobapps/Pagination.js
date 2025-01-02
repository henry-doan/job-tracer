import { Pagination } from "react-bootstrap";

const JobAppPagination = ({ currentPage, totalPages, onPageClick }) => {
  const makePaginationItem = (i) => (
    <Pagination.Item
      key={i}
      active={i === currentPage}
      onClick={() => onPageClick(i)}
    >
      {i}
    </Pagination.Item>
  );

  const paginationItems = [];
  paginationItems.push(<Pagination.Ellipsis />);
  const midpoint = Math.round(totalPages / 2);

  for (let i = midpoint; i <= midpoint + 4; i++) {
    paginationItems.push(makePaginationItem(i));
  }

  paginationItems.push(<Pagination.Ellipsis />);
  paginationItems.push(makePaginationItem(totalPages));

  return(
    <Pagination className="paginationInfo">
      <Pagination.Prev
        onClick={() => onPageClick(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => onPageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  )
}

export default JobAppPagination;