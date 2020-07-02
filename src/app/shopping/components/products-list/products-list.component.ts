import { Component, OnInit, Input } from '@angular/core';
import { Currency } from 'src/app/currency/models/currency';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from 'src/app/reducers';
import { Product, Shop } from '../../models/product';
import { productReceived, shopUpdated, productDeleted } from '../../store/shopping.actions';
import { findShop } from '../../utilities/findShop';
import { ShoppingService } from '../../shopping.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @Input() currencyUpdated: Currency;
  @Input() products: Product[];
  @Input() shops: Shop[];

  constructor(private store: Store<AppState>, private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  checkToggled(product: Product) {
    const isReceived = !product.received;
    const originalShop = this.shops.find((shop) => shop.id === product.shop.id);
    
    const updatedProduct: Product = {
      ...product,
      received: isReceived,
    };

    const updatedShop: Shop = {
      ...originalShop,
      ...this.shoppingService.recalculateShopTotals({product, calculationType: 'receive', shop: originalShop})
    };

    const productUpdate: Update<Product> = {
      id: product.id,
      changes: updatedProduct,
    };

    const shopUpdate: Update<Shop> = {
      id: product.shop.id,
      changes: updatedShop,
    };

    this.store.dispatch(productReceived({ update: { ...productUpdate } }));
    this.store.dispatch(shopUpdated({ update: { ...shopUpdate } }));
  }

  deleteItem(product: Product) {
    const originalShop = findShop(this.shops, product.shop.id);

    const updatedShop: Shop = {
      ...originalShop,
      ...this.shoppingService.recalculateShopTotals({product, calculationType: 'remove', shop: originalShop})
    };

    const shopUpdate: Update<Shop> = {
      id: product.shop.id,
      changes: updatedShop,
    };

    this.store.dispatch(productDeleted({ id: product.id }));
    this.store.dispatch(shopUpdated({ update: { ...shopUpdate } }));
  }
}
