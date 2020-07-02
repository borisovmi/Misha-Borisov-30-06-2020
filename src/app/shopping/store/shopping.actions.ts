import { createAction, props } from '@ngrx/store';
import { Product, Shop } from '../models/product';
import { Update } from '@ngrx/entity';

export const loadAllProducts = createAction(
  '[Products Resolver] Load All Products'
);

export const allProductsLoaded = createAction(
  '[Load Products Effect] All Products Loaded',
  props<{ products: Product[] }>()
);

export const productAdded = createAction(
  '[Add Product] Add Product',
  props<{ product: Product }>()
);

export const productReceived = createAction(
  '[Products List] Product Received',
  props<{ update: Update<Product> }>()
);

export const productDeleted = createAction(
  '[Products List] Product Deleted',
  props<{ id: string }>()
);

export const loadAllShops = createAction(
  '[Shops Resolver] Load All Shops'
);

export const allShopsLoaded = createAction(
  '[Load Shops Effect] All Shops Loaded',
  props<{ shops: Shop[] }>()
);

export const shopUpdated = createAction(
  '[Shopping] Shop Updated',
  props<{ update: Update<Shop> }>()
);
