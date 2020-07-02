import { Shop, Product } from '../models/product';

export function findShop(shops: Shop[], productShopId: string): Shop {
  return shops.find((shop) => shop.id === productShopId);
}
