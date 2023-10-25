import React, { useEffect, useState } from "react";
import ShowTable from "./ShowTable";
import { transaction } from "../../others/Form";
import { GroupedData } from "./ShowTransactions";

type ShowDataProps = {
  transaction: transaction[] | GroupedData;
  oldTransactions: transaction[];
};
const ShowData = ({ transaction, oldTransactions }: ShowDataProps) => {
  const [tempData, setTempData] = useState<transaction[] | GroupedData>([]);
  const [sortMethod, setSortMethod] = useState(1);

  useEffect(() => {
    if (Array.isArray(transaction)) {
      setTempData(transaction);
    } else if (!Array.isArray(transaction)) {
      setTempData(oldTransactions);
    }
  }, [transaction, oldTransactions]);

  const sort = (name: string, title: string) => {
    if (sortMethod > 2) {
      setSortMethod(1);
    } else {
      setSortMethod(sortMethod + 1);
    }
    let cloneData: transaction[] | GroupedData = [];
    if (!title) {
      cloneData = Array.isArray(transaction) ? [...transaction] : [];
      if (sortMethod === 1) {
        cloneData = cloneData.sort((a, b) => (a[name] > b[name] ? 1 : -1));
      } else if (sortMethod === 2) {
        cloneData = cloneData.sort((a, b) => (a[name] < b[name] ? 1 : -1));
      }
    } else {
      cloneData = { ...transaction };
    }
    setTempData(cloneData);
  };
  return (
    <>
      {Array.isArray(transaction) && transaction?.length > 0 && (
        <ShowTable sort={sort} arr={tempData} sortMethod={sortMethod} />
      )}
      {transaction &&
        !Array.isArray(transaction) &&
        Object.keys(transaction).map((item, i) => {
          return (
            <div key={i}>
              <ShowTable
                title={item}
                sort={sort}
                arr={transaction[item]}
                sortMethod={sortMethod}
              />
            </div>
          );
        })}
    </>
  );
};

export default ShowData;
