import { Product } from '../models/product';

export function compareProductsDates(p1: Product, p2: Product) {
  const compare =
    new Date(p1.deliveryEstDate).getTime() -
    new Date(p2.deliveryEstDate).getTime();

  if (compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  } else return 0;
}
