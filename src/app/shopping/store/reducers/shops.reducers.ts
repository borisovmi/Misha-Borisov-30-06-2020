import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Shop } from '../../models/product';
import { ShoppingActions } from '../action.types';

export const shopsFeatureKey = 'shops';

export interface ShopsState extends EntityState<Shop> {
  allShopsLoaded: boolean;
}
export const adapter = createEntityAdapter<Shop>();
export const initialShopsState = adapter.getInitialState({
  allShopsLoaded: false,
});

export const shopsReducer = createReducer(
  initialShopsState,
  on(ShoppingActions.allShopsLoaded, (state, action) => {
    return adapter.addAll(action.shops, {
      ...state,
      allShopsLoaded: true,
    });
  }),
  on(ShoppingActions.shopUpdated, (state, { update }) => {
    return adapter.updateOne(update, state);
  })
);

export const { selectAll } = adapter.getSelectors();
