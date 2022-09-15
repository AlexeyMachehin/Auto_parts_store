import { RootState } from './store';
import { useAppSelector } from '../app/hooks';
import { createSelector } from '@reduxjs/toolkit';

const select = (state: RootState) => state

// export const selectorIsLoading = useAppSelector([select], (store) => store.products.isLoading)


export const selectorAllProducts = createSelector([select], (store) => store.products.products)

export const  selectorProductsInCart = createSelector([select], (store) => store.products.productsInCart)

export const selectorCountProductsInCart = createSelector([select], (store) => store.products.countProductsInCart)