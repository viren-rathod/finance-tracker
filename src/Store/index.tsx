import { configureStore } from "@reduxjs/toolkit";
import financeSlice from "./slices/financeSlice";
import userSlice from "./slices/userSlice";

/*export interface RootState {
  finance: FinanceState;
}

interface FinanceState {
  transactions: transaction[];
}*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    finance: financeSlice,
    user: userSlice,
  },
});

export default store;
