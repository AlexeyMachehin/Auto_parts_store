import { initialState } from "./state";
import { getProducts } from "./thunk";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../interfaces/product";
import { localStorageUtil } from "../utils/localStorageUtil";

export const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
});

const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState(initialState),
  reducers: {
    setDiscountDates(state, action) {
      state.discountDates = action.payload;
    },
    setProductInCart(
      state,
      action: { payload: Product }
    ) {
      const index = state.productsInCart.findIndex(
        (el: Product) => el.id === action.payload.id
      );
      if (index !== -1) {
        state.productsInCart.splice(index, 1, action.payload);
      } else {
        state.productsInCart.push(action.payload);
      }
      // state.productsInCart.push(action.payload);
    },
    setProductsInCart(
      state,
      action: { payload: Product[] }
    ) {
      state.productsInCart = action.payload;
    },
    deleteProductFromCart(state, action: { payload: string }) {
      const index = state.productsInCart.findIndex(
        (el: Product) => el.id === action.payload
      );
      // if (index !== -1) {
      //   state.productsInCart.splice(index, 1);
      // }
      if (state.productsInCart[index].quantityInCart === 1) {
        state.productsInCart.splice(index, 1);
      } else {
        const count = state.productsInCart[index].quantityInCart - 1;
        state.productsInCart[index].quantityInCart = count;
      }
    },

    setCountProductsInCart(state) {
      const productFromLocalStorage = localStorageUtil.getProducts();
      let sum = 0;
      for (let index = 0; index < productFromLocalStorage.length; index++) {
        const element = productFromLocalStorage[index].quantityInCart;
        if (element !== undefined) {
          sum = sum + element;
        }
      }

      // const sum = productFromLocalStorage.reduce(
      //   (acc: number, product: Product) => acc + (product.quantityInCart ?? 0)
      // );
      state.countProductsInCart = sum;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        state.products = null;
      });
  },
});

export const {
  setDiscountDates,
  setProductInCart,
  deleteProductFromCart,
  setCountProductsInCart,
  setProductsInCart,
} = productsSlice.actions;

export default productsSlice.reducer;
