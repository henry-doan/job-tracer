import { Pagination } from "react-bootstrap";

const JobAppPagination = ({ currentPage, totalPages, onPageClick }) => {
  const makePages = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageClick(number)}>
          {number}
        </Pagination.Item>,
      );
    }

    return items
  }

  return(
    <Pagination>{makePages()}</Pagination>
  )
}

export default JobAppPagination;