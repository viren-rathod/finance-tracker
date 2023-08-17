import React, { useState } from "react";
import NavBar from "../../others/NavBar";
import ShowData from "./ShowData";
import GroupBy from "../../others/GroupBy";

const ShowTransactions = () => {
  const user = localStorage.getItem("activeUser");
  const userEmail: string = JSON.parse(user || "{}").email;

  let allTransactions = JSON.parse(
    localStorage.getItem("transactions") || "[]"
  );
  let oldTransactions = allTransactions && [...allTransactions];
  oldTransactions = oldTransactions.filter(
    (item: any) => item.user === userEmail
  );

  const [transaction, setTransaction] = useState(oldTransactions);

  return (
    <>
      <NavBar />
      <GroupBy transaction={oldTransactions} setTransaction={setTransaction} />
      <ShowData transaction={transaction} oldTransactions={oldTransactions} />
    </>
  );
};

export default ShowTransactions;
