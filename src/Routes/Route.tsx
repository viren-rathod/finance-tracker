import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RouteAuth, { CheckLoginAuth } from "../utils/RouteAuth";
import ShowTransactions from "../pages/transactions/ShowTransactions";
import TransactionInfo from "../pages/transactions/TransactionInfo";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AddTransaction from "../pages/transactions/AddTransaction";

const AllRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RouteAuth />}>
          <Route path="/" element={<Navigate to="/home" replace={true} />} />
          <Route path="/home" element={<ShowTransactions />}></Route>
          <Route path="/transaction/:id" element={<TransactionInfo />} />
          <Route path="/add" element={<AddTransaction />} />
        </Route>
        <Route element={<CheckLoginAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
