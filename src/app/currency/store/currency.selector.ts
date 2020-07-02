import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CurrencyState } from './currency.reducers';

export const selectCurrencyState = createFeatureSelector<CurrencyState>(
  'currency'
);

export const currencyUpdated = createSelector(
  selectCurrencyState,
  (currency) => {
    return currency.currency;
  }
);

export const currentShowCurrency = createSelector(
  selectCurrencyState,
  (currency) => {
    if (currency.currency) {
      return Object.keys(currency.currency.rates)[0];
    }
    return 'USD'
  }
);

export const currencySuccessTimeUpdated = createSelector(
  selectCurrencyState,
  (currency) => {
    return currency.successTimeString;
  }
);

export const currencyError = createSelector(
  selectCurrencyState,
  (currency) => {
    return currency.currencyError;
  }
);
