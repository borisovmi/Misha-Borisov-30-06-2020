import { MetaReducer, createReducer, on } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Currency } from '../models/currency';
import { CurrencyActions } from './action.types';

export const currencyFeatureKey = 'currency';

export interface CurrencyState {
  currency: Currency;
  successTimeString: string;
  currencyError: string;
}

const initialCurrencyState: CurrencyState = {
  currency: undefined,
  successTimeString: undefined,
  currencyError: '',
};

export const metaReducers: MetaReducer<
  CurrencyState
>[] = !environment.production ? [] : [];

export const currencyReducer = createReducer(
  initialCurrencyState,
  on(CurrencyActions.currencyFetchSuccess, (state, action) => {
    return {
      currency: action.currency,
      successTimeString: action.successTimeString,
    };
  }),
  on(CurrencyActions.currencyFetchFail, (state, action) => {
    return {
      ...state,
      currencyError: action.currencyError.error,
    };
  })
);
