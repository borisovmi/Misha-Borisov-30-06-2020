import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Shop } from './models/product';
import { Observable } from 'rxjs';

export interface CalculateShopTotalsOptions {
  product: Product;
  calculationType: 'add' | 'receive' | 'remove';
  shop?: Shop;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor(private http: HttpClient) {}

  getInitialProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products.json');
  }

  getInitialShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>('assets/shops.json');
  }

  createNewProduct(
    name: string,
    price: number,
    date: Date,
    shop: Shop
  ): Product {
    const newProduct: Product = {
      id: 'p' + Date.now(),
      name: name,
      price: {
        USD: price,
      },
      received: false,
      deliveryEstDate: new Date(date).toISOString(),
      shop: shop,
    };

    return newProduct;
  }

  recalculateShopTotals(options: CalculateShopTotalsOptions): Partial<Shop> {
    const { calculationType, product, shop } = options;
    
    let totals: Partial<Shop>;

    switch (calculationType) {
      case 'add':
        totals = {
          totalValue: {
            USD: product.shop.totalValue.USD + product.price.USD,
          },

          totalProducts: product.shop.totalProducts + 1,

          totalReceivedProducts: product.received
            ? product.shop.totalReceivedProducts + 1
            : product.shop.totalReceivedProducts,

          totalReceivedValue: {
            USD: product.received
              ? product.shop.totalReceivedValue.USD + product.price.USD
              : product.shop.totalReceivedValue.USD,
          },
        };
        break;

      case 'remove':
        totals = {
          totalValue: {
            USD: shop.totalValue.USD - product.price.USD,
          },

          totalProducts: shop.totalProducts - 1,

          totalReceivedProducts: product.received
            ? shop.totalReceivedProducts - 1
            : shop.totalReceivedProducts,

          totalReceivedValue: {
            USD: product.received
              ? shop.totalReceivedValue.USD - product.price.USD
              : shop.totalReceivedValue.USD,
          },
        };
        break;
      case 'receive':
        const isReceived = !product.received;
        totals = {
          totalReceivedProducts: !isReceived
            ? shop.totalReceivedProducts > 0
              ? shop.totalReceivedProducts - 1
              : shop.totalReceivedProducts
            : shop.totalReceivedProducts + 1,
          totalReceivedValue: {
            USD: isReceived
              ? shop.totalReceivedValue.USD + product.price.USD
              : shop.totalReceivedValue.USD - product.price.USD,
          },
        };
        break;
    }

    return totals;
  }
}
