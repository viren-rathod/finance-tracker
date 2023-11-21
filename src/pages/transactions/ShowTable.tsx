import React, { ChangeEvent, useEffect, useState } from "react";
import { columnTitles } from "../../utils/Constants";
import { edit, plus, show, trash } from "../../utils/icons";
import { Link } from "react-router-dom";
import DeleteTransaction from "./DeleteTransaction";
import Paginated from "../../others/Pagination";
import { Form } from "react-bootstrap";
import { transaction } from "../../others/Form";
import { GroupedData } from "./ShowTransactions";

export type PaginatonType = {
  start: number;
  currentPage: number;
  itemPerPage: number;
};
type ShowTableType = {
  title?: string | undefined;
  sort: (name: string, title: string | undefined) => void;
  arr: transaction[] | GroupedData;
  sortMethod: number;
};
const ShowTable = ({ title, sort, arr }: ShowTableType) => {
  //
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(parseInt(" "));
  const handleDelete = (id: number) => {
    setId(id);
    setShowModal(true);
  };

  const [pagination, setPagination] = useState<PaginatonType>({
    start: 0,
    currentPage: 1,
    itemPerPage: 3,
  });
  const lastItemIndex = pagination?.currentPage * pagination?.itemPerPage;
  const firstItemIndex = lastItemIndex - pagination?.itemPerPage;

  const [myArr, setMyArr] = useState<transaction[] | {}>([{}]);

  useEffect(() => {
    if (Array.isArray(arr) && arr.length) {
      setMyArr(arr.slice(firstItemIndex, lastItemIndex));
    }
    if (Array.isArray(arr) && arr.length && arr.length - 1 < firstItemIndex) {
      setMyArr(arr.slice(0, 3));
      setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
    }
  }, [arr, firstItemIndex, lastItemIndex,pagination]);

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPagination({
      ...pagination,
      itemPerPage: parseInt(e.target.value),
      currentPage: 1,
    });
  };

  return (
    <>
      <div className="container main">
        {Array.isArray(myArr) &&
        Object.keys(myArr[0]) &&
        myArr.length &&
        Object.keys(myArr[0]).length !== 0 ? (
          <>
            <h3>{title ? title : "All Transactions"}</h3>
            <table className="table table-hover">
              <thead>
                <tr key={0}>
                  {columnTitles.map((t) => {
                    return (
                      <th key={t.id} onClick={() => sort(t.label, title)}>
                        {t.title}
                      </th>
                    );
                  })}
                  <th>Show</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {myArr.map((item, index) => {
                  return (
                    <tr key={index + 1}>
                      <td className="pt-5">{item.tDate}</td>
                      <td className="pt-5">{item.monthYear}</td>
                      <td className="pt-5">{item.transactionType}</td>
                      <td className="pt-5">{item.fromAccount}</td>
                      <td className="pt-5">{item.toAccount}</td>
                      <td className="pt-5">₹ {item.amount}</td>
                      <td>
                        <img src={item.receipt} alt="" />
                      </td>
                      <td className="pt-5">{item.notes}</td>
                      <td className="show pt-5">
                        <Link to={`/transaction/${item.key}`}>{show}</Link>
                      </td>
                      <td className="edit pt-5">
                        <Link
                          to="/add"
                          state={{ id: item.key }}
                          className="underline-none"
                        >
                          {edit}
                        </Link>
                      </td>
                      <td
                        className="delete pt-5"
                        onClick={() => handleDelete(item.key)}
                      >
                        <Link to="">{trash}</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <span>Transactions </span>
                <Form.Select className="ms-2" onChange={handleLimitChange}>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </Form.Select>
              </div>
              <Paginated
                totalItem={(Array.isArray(arr) && arr.length) || 0}
                setPagination={setPagination}
                pagination={pagination}
              />
            </div>
          </>
        ) : (
          <Link to="/add">
            {/* <Button variant="primary" className="text-light fw-bold">
              <span>{plus}</span>
              <span>Add Transaction</span>
            </Button> */}
            <button
              type="submit"
              className="custom-btn btn-save my-3 px-4 text-light fw-bold"
            >
              <span>{plus}</span>
              <span>Add Transaction</span>
            </button>
          </Link>
        )}
      </div>
      {
        <DeleteTransaction
          setShowModal={setShowModal}
          showModal={showModal}
          id={id}
        />
      }
    </>
  );
};

export default ShowTable;
