import React from "react";
import AllRoute from "./Routes/Route";
// import { FinanceWrapperContext } from "./Context/FinanceContext";
import { Provider } from "react-redux";
import store from "./Store";

const App = () => {
  return (
    // <FinanceWrapperContext>
    <Provider store={store}>
      <AllRoute />
    </Provider>
    // </FinanceWrapperContext>
  );
};

export default App;
