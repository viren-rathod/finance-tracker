import { configureStore } from "@reduxjs/toolkit";
import financeSlice from "./slices/financeSlice";
import { transaction } from "../others/Form";

export interface RootState {
  finance: FinanceState;
}

interface FinanceState {
  transactions: transaction[];
}

const store = configureStore({
  reducer: { finance: financeSlice },
});

export default store;
