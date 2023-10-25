import React, { ChangeEvent, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { columnTitles } from "../utils/Constants";
import { transaction } from "./Form";
import { GroupedData } from "../pages/transactions/ShowTransactions";

type GroupByProps = {
  transaction: transaction[];
  setT: React.Dispatch<React.SetStateAction<transaction[] | GroupedData>>;
};
const GroupBy = ({ transaction, setT }: GroupByProps) => {
  const [flag, setFlag] = useState(false);
  const [selected, setSelected] = useState("DEFAULT");
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const field = event.target.value;
    setSelected(field);
    const cloneData: transaction[] = transaction && [...transaction];
    const groupedData: GroupedData = {};
    cloneData.map((item) => {
      const category = item[field];
      groupedData[category] = groupedData[category] ?? [];
      groupedData[category].push(item);
      setFlag(true);
      return groupedData;
    });
    /*
    let tempData = cloneData.reduce((group: GroupedData, item: transaction) => {
      const category = item[field];
      group[category] = group[category] ?? [];
      group[category].push(item);
      return group;
    }, {});
    */
    setT(groupedData);
  };

  function handleResetGroupBy(
    event: React.MouseEvent<HTMLButtonElement>
  ): void {
    setT(transaction);
    setFlag(false);
    setSelected("DEFAULT");
  }

  return (
    <div className="container main">
      {transaction?.length > 0 && (
        <FloatingLabel label="Group By field" className="my-2">
          <Form.Select name="groupBy" value={selected} onChange={handleChange}>
            <option value={"DEFAULT"} disabled hidden>
              Select a Field
            </option>
            {columnTitles.map((t) => {
              return (
                <option key={t.id} value={t.label}>
                  {t.title}
                </option>
              );
            })}
          </Form.Select>
        </FloatingLabel>
      )}
      {flag && (
        <div>
          <button onClick={handleResetGroupBy} className="custom-btn btn-save">
            Reset Group By
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupBy;
