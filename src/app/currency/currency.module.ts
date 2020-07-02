import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCurrency from './store/currency.reducers';
import { CurrencyComponent } from './currency/currency.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CurrencyEffects } from './store/currency.effects';
import { TimeIntervalPipe } from './pipes/time-interval.pipe';

@NgModule({
  declarations: [CurrencyComponent, TimeIntervalPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(
      fromCurrency.currencyFeatureKey,
      fromCurrency.currencyReducer
    ),
    EffectsModule.forFeature([CurrencyEffects])
  ],
  exports: [CurrencyComponent],
})
export class CurrencyModule {}
