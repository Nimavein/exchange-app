import { configureStore } from "@reduxjs/toolkit";
import currenciesSlice from "./features/currencies/currenciesSlice";
import transactionsSlice from "./features/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    currencies: currenciesSlice,
    transactions: transactionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
