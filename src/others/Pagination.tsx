import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginated = ({ totalItem, setPagination, pagination }: any) => {
  let pages = [],
    currentPage = pagination?.currentPage,
    itemPerPage = pagination?.itemPerPage;
  for (let i = 1; i <= Math.ceil(totalItem / itemPerPage); i++) pages.push(i);

  return (
    <Pagination className="m-0">
      <Pagination.First
        onClick={() => setPagination({ ...pagination, currentPage: 1 })}
        disabled={currentPage === 1 ? true : false}
      />
      <Pagination.Prev
        onClick={() =>
          setPagination({ ...pagination, currentPage: currentPage - 1 })
        }
        disabled={currentPage === 1 ? true : false}
      />
      {pages.map((page, index) => {
        return (
          <Pagination.Item
            key={index}
            className={page === currentPage ? "active" : ""}
            onClick={() => setPagination({ ...pagination, currentPage: page })}
          >
            {page}
          </Pagination.Item>
        );
      })}
      <Pagination.Next
        onClick={() =>
          setPagination({ ...pagination, currentPage: currentPage + 1 })
        }
        disabled={currentPage === pages.length ? true : false}
      />
      <Pagination.Last
        onClick={() =>
          setPagination({ ...pagination, currentPage: pages.length })
        }
        disabled={currentPage === pages.length ? true : false}
      />
    </Pagination>
  );
};

export default Paginated;
