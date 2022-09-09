import { initialState } from "./state";
import { getProducts } from "./thunk";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../interfaces/product";

export const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        state.products = null;
      });
  },
});

export default productsSlice.reducer;
