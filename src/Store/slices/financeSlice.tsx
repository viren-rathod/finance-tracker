import { createSlice } from "@reduxjs/toolkit";
import { DATA } from "../../utils/data";

const financeSlice = createSlice({
  name: "Transactions",
  initialState: {
    transactions: DATA,
  },
  reducers: {
    setTransaction: (state, action) =>
      void (state.transactions = action.payload),
  },
});
export const { setTransaction } = financeSlice.actions;
export default financeSlice.reducer;
