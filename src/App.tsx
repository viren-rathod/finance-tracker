import React from "react";
import AllRoute from "./Routes/Route";
import { Provider } from "react-redux";
import store from "./Store";
import ErrorBoundary from "./utils/ErrorBoundry";

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AllRoute />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
