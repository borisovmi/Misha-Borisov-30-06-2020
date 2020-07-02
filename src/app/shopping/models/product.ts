
export interface Product {
  id: string;
  name: string;
  shop: Shop;
  price: Price;
  received: boolean;
  deliveryEstDate: string;
}

export interface Shop {
  id: string;
  name: string;
  totalProducts: number;
  totalReceivedProducts: number;
  totalValue: Price;
  totalReceivedValue: Price;
}

export interface Price {
  USD: number;
}