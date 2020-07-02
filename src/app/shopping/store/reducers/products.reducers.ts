import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product';
import { compareProductsDates } from '../../utilities/compare';
import { ShoppingActions } from '../action.types';

export const productsFeatureKey = 'products';

export interface ProductsState extends EntityState<Product> {
  allProductsLoaded: boolean;
}

export const adapter = createEntityAdapter<Product>({
  sortComparer: compareProductsDates
});

export const initialProductsState = adapter.getInitialState({
  allProductsLoaded: false,
});

export const productsReducer = createReducer(
  initialProductsState,
  on(ShoppingActions.allProductsLoaded, (state, action) => {
    return adapter.addAll(action.products, {
      ...state,
      allProductsLoaded: true,
    });
  }),
  on(ShoppingActions.productAdded, (state, action) => {
    return adapter.addOne(action.product, state);
  }),
  on(ShoppingActions.productReceived, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(ShoppingActions.productDeleted, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
);

export const { selectAll } = adapter.getSelectors();
