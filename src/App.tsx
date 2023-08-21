import React from "react";
import AllRoute from "./Routes/Route";
import { FinanceWrapperContext } from "./Context/FinanceContext";

const App = () => {
  return (
    <FinanceWrapperContext>
      <AllRoute />
    </FinanceWrapperContext>
  );
};

export default App;
