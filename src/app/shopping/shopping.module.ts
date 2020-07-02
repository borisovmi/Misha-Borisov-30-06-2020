import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingEffects } from './store/shopping.effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material.module';
import { ConvertCurrencyPipe } from './pipes/convert-currency.pipe';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { productsReducer, productsFeatureKey } from './store/reducers/products.reducers';
import { shopsReducer, shopsFeatureKey } from './store/reducers/shops.reducers';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ShopsListComponent } from './components/shops-list/shops-list.component';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsListComponent,
    ConvertCurrencyPipe,
    ShopsListComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ShoppingRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(productsFeatureKey, productsReducer),
    StoreModule.forFeature(shopsFeatureKey, shopsReducer),
    EffectsModule.forFeature([ShoppingEffects]),
  ],
  providers: [CurrencyPipe],
})
export class ShoppingModule {}
