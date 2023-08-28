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
    deleteTransaction: (state, action) => {
      const transactionIdToDelete = action.payload;
      state.transactions = state.transactions.filter(
        (transaction) => transaction.key !== transactionIdToDelete
      );
    },
  },
});
export const { setTransaction,deleteTransaction } = financeSlice.actions;
export default financeSlice.reducer;
