/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

export const fetchExchangeRate = createAsyncThunk(
  "currencies/fetchExchangeRate",
  async () => {
    const response = await axios.get(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=${[
        "PLN",
      ]}&base=${["EUR"]}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          apiKey: process.env.REACT_APP_API_KEY!,
        },
      }
    );

    return response.data.rates["PLN"];
  }
);

type ExchangeRateState = {
  isLoading: boolean;
  error: null | undefined | string;
  exchangeRate: number;
};

const initialState: ExchangeRateState = {
  isLoading: false,
  error: null,
  exchangeRate: 0,
};

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    changeExchangeRate(state, action: PayloadAction<number>) {
      state.exchangeRate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchExchangeRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exchangeRate = action.payload;
      })
      .addCase(fetchExchangeRate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(
          `There was an error while fetching currencies exchange rates. ${action.error.message}`
        );
      });
  },
});

const { reducer } = currenciesSlice;

export default reducer;
