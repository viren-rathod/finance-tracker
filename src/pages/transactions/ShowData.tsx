import React, { useEffect, useState } from "react";
import ShowTable from "./ShowTable";
import { transaction } from "../../others/Form";
import { GroupedData } from "./ShowTransactions";

type ShowDataProps = {
  transaction: transaction[] | GroupedData;
  oldTransactions: transaction[];
};
const ShowData = ({ transaction, oldTransactions }: ShowDataProps) => {
  const [tempData, setTempData] = useState<transaction[]>([]);
  const [tempObjData, setTempObjData] = useState<GroupedData>({});
  const [sortMethod, setSortMethod] = useState(1);

  useEffect(() => {
    if (Array.isArray(transaction)) {
      setTempData(transaction);
    } else if (!Array.isArray(transaction)) {
      setTempObjData(transaction);
    }
  }, [transaction, oldTransactions]);
  const sort = (name: string, title: string | undefined) => {
    if (sortMethod > 2) {
      setSortMethod(1);
    } else {
      setSortMethod(sortMethod + 1);
    }
    let arrayData: transaction[];
    let objData: GroupedData;
    if (!title) {
      arrayData = Array.isArray(transaction) ? [...transaction] : [];
      if (sortMethod === 1) {
        arrayData = arrayData.sort((a, b) => (a[name] > b[name] ? 1 : -1));
      } else if (sortMethod === 2) {
        arrayData = arrayData.sort((a, b) => (a[name] < b[name] ? 1 : -1));
      }
      setTempData(arrayData);
    } else {
      objData = !Array.isArray(transaction) ? transaction : {};
      let dataToSort = objData[title];
      let sortedData: transaction[] = [];
      if (sortMethod === 1) {
        sortedData = [...dataToSort].sort((a, b) =>
          a[name] > b[name] ? 1 : -1
        );
      } else if (sortMethod === 2) {
        sortedData = [...dataToSort].sort((a, b) =>
          a[name] < b[name] ? 1 : -1
        );
      }
      const sortedObjData: GroupedData = { ...objData, [title]: sortedData };
      setTempObjData(sortedObjData);
    }
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
                arr={tempObjData[item]}
                sortMethod={sortMethod}
              />
            </div>
          );
        })}
    </>
  );
};

export default ShowData;
