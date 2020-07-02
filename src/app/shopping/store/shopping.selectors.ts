import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './reducers/products.reducers';
import * as fromProducts from './reducers/products.reducers'
import { ShopsState } from './reducers/shops.reducers';
import * as fromShops from './reducers/shops.reducers'

export const selectProductsState = createFeatureSelector<ProductsState>('products');
export const selectShopsState = createFeatureSelector<ShopsState>('shops');

export const selectAllProducts = createSelector(
  selectProductsState,
  fromProducts.selectAll
)

export const selectAllShops = createSelector(
  selectShopsState,
  fromShops.selectAll
)

export const areProductsLoaded = createSelector(
  selectProductsState, 
  state => state.allProductsLoaded
)

export const areShopsLoaded = createSelector(
  selectShopsState, 
  state => state.allShopsLoaded
)
