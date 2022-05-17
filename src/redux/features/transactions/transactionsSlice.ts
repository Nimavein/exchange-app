/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TransactionType = {
  id: string;
  name: string;
  createdAt: number;
  amount: number;
};

const initialState: TransactionType[] = [];

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<TransactionType>) {
      state.push(action.payload);
    },
    deleteTransaction(state, action: PayloadAction<string>) {
      return state.filter((transaction) => action.payload !== transaction.id);
    },
  },
});

const { reducer } = transactionsSlice;

export default reducer;
