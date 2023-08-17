import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RouteAuth, { CheckLoginAuth } from "./utils/RouteAuth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ShowTransactions from "./pages/transactions/ShowTransactions";
import TransactionInfo from "./pages/transactions/TransactionInfo";
import TransactionForm from "./pages/transactions/AddTransaction";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<RouteAuth />}>
          <Route path="/" element={<Navigate to="/home" replace={true} />} />
          <Route path="/home" element={<ShowTransactions />}></Route>
          <Route path="/transaction/:id" element={<TransactionInfo />} />
          <Route path="/add" element={<TransactionForm />} />
        </Route>
        <Route element={<CheckLoginAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
