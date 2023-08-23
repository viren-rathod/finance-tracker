import { configureStore } from "@reduxjs/toolkit";
import financeSlice from "./slices/financeSlice";

const store = configureStore({
  reducer: { finance: financeSlice },
});

export default store;
