import React, { ChangeEvent, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { columnTitles } from "../utils/Constants";

const GroupBy = ({ transaction, setT }: any) => {
  interface DataItem {
    tDate: string;
    monthYear: string;
    transactionType: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    receipt: string;
    notes: string;
    user: string;
    key: number;
    [key: string]: string | number;
  }

  type GroupedData = {
    [key: string]: DataItem[];
  };

  const [flag, setFlag] = useState(false);
  const [selected, setSelected] = useState("DEFAULT");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelected(event.target.value);
    const field = event.target.value;
    const cloneData: DataItem[] = transaction && [...transaction];
    const groupedData: GroupedData = {};
    cloneData.map((item) => {
      const category = item[field];
      groupedData[category] = groupedData[category] ?? [];
      groupedData[category].push(item);
      setFlag(true);
      return groupedData;
    });
    setT(groupedData);
    /*
    let tempData = cloneData.reduce((group: GroupedData, item: DataItem) => {
      const category = item[field];
      group[category] = group[category] ?? [];
      group[category].push(item);
      return group;
    }, {});
    */
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
      <FloatingLabel label="Group By field" className="my-2">
        <Form.Select name="groupBy" onChange={handleChange} value={selected}>
          <option value={"DEFAULT"} disabled hidden>
            Select a Field
          </option>
          {columnTitles.map((t) => {
            return (
              t.label !== "receipt" && (
                <option key={t.id} value={t.label}>
                  {t.title}
                </option>
              )
            );
          })}
        </Form.Select>
      </FloatingLabel>
      {flag && (
        <div>
          {/* <Button onClick={handleResetGroupBy}>Reset Group By</Button> */}
          <button
            className="custom-btn btn-save my-3 px-4"
            onClick={handleResetGroupBy}
          >
            Reset Group By
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupBy;
