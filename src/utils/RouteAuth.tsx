import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RouteAuth = () => {
  let auth = false;
  if (localStorage.getItem("activeUser")) {
    auth = true;
  }
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

const CheckLoginAuth = () => {
  let auth = true;
  if (localStorage.getItem("activeUser")) {
    auth = false;
  }
  return auth ? <Outlet /> : <Navigate to="/home" />;
};
export { CheckLoginAuth };
export default RouteAuth;
