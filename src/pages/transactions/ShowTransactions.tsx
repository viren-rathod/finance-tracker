import { useState } from "react";
import NavBar from "../../others/NavBar";
import ShowData from "./ShowData";
import GroupBy from "../../others/GroupBy";
import { useSelector } from "react-redux";

const ShowTransactions = () => {
  const user = localStorage.getItem("activeUser");
  const userEmail: string = JSON.parse(user || "{}").email;
  const { transactions } = useSelector((state: any) => state.finance);

  let oldTransactions = transactions && [...transactions];
  oldTransactions = oldTransactions.filter(
    (item: any) => item.user === userEmail
  );

  const [transaction, setT] = useState(oldTransactions);

  return (
    <>
      <NavBar />
      <GroupBy transaction={oldTransactions} setT={setT} />
      <ShowData transaction={transaction} oldTransactions={oldTransactions} />
    </>
  );
};

export default ShowTransactions;
