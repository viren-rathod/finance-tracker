import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DATA } from "../../utils/data";
import { transaction } from "../../others/Form";

const financeSlice = createSlice({
  name: "Transactions",
  initialState: {
    transactions: DATA,
  },
  reducers: {
    setTransaction: (state, action: PayloadAction<transaction[]>):void =>
      void (state.transactions = action.payload),
    deleteTransaction: (state, action: PayloadAction<number>) => {
      const transactionIdToDelete = action.payload;
      state.transactions = state.transactions.filter(
        (transaction) => transaction.key !== transactionIdToDelete
      );
    },
  },
});
export const { setTransaction, deleteTransaction } = financeSlice.actions;
export default financeSlice.reducer;
