import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currencyUpdated } from 'src/app/currency/store/currency.selector';
import { Currency } from 'src/app/currency/models/currency';
import { map, first, filter } from 'rxjs/operators';
import { selectUrl } from 'src/app/router-store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AppState } from 'src/app/reducers';
import { Product, Shop } from '../../models/product';
import {
  selectAllProducts,
  selectAllShops,
} from '../../store/shopping.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  currencyUpdated$: Observable<Currency>;
  allProducts$: Observable<Product[]>;
  allShops$: Observable<Shop[]>;

  receivedList: boolean;

  activeTab: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.currencyUpdated$ = this.store.pipe(select(currencyUpdated));
    this.getInitialProducts();
  }

  onTabChanged(event: MatTabChangeEvent) {
    this.activeTab = event.index;
  }

  getInitialProducts() {
    this.store.pipe(select(selectUrl), first()).subscribe((url) => {
      this.receivedList = url.includes('received');

      this.allProducts$ = this.store.pipe(
        select(selectAllProducts),
        map((products) => {
          return products.filter(
            (product) => this.receivedList === product.received
          );
        })
      );

      this.allShops$ = this.store.pipe(
        select(selectAllShops),
        map((shops) => {
          return shops.filter((shop) => {
            return this.receivedList
              ? shop.totalReceivedProducts > 0
              : shop.totalProducts > shop.totalReceivedProducts;
          });
        })
      );
    });
  }
}
