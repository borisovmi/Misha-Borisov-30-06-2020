import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CurrencyActions } from './action.types';
import {
  tap,
  map,
  switchMap,
  catchError,
  take,
  startWith,
  concatMap,
} from 'rxjs/operators';
import {
  CurrencyRequestParams,
  Currency,
  CurrencyError,
} from '../models/currency';
import { interval, of, combineLatest } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CurrencyEffects {
  requestsCounter = 1;

  currencyFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CurrencyActions.currencyFetchFail),
        map((errorMsg) => {
          this.snackbar.open(errorMsg.currencyError.error, 'X');
        })
      ),
    { dispatch: false }
  );

  currencyFetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.currencyFetchStart),
      map((action) => action.currencyRequestParams),
      switchMap((currencyRequestParams: CurrencyRequestParams) => {
        const initialCurrencyData: Currency = JSON.parse(
          localStorage.getItem('currency')
        );
        return interval(currencyRequestParams.fetchInterval).pipe(
          tap(() => this.requestsCounter++),
          startWith(initialCurrencyData),
          switchMap(() =>
            this.http
              .get<Currency>(
                `https://api.exchangeratesapi.io/latest?symbols=${currencyRequestParams.convertionCurrencySymbol}&base=${currencyRequestParams.baseCurrencySymbol}`
              )
              .pipe(
                map((currency) => {
                  return this.handleCurrencySuccess(currency);
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                  return this.handleCurrencyError(errorResponse.error.error);
                })
              )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) {}

  handleCurrencySuccess(currency: Currency) {
    this.snackbar.dismiss();

    localStorage.setItem('currency', JSON.stringify(currency));

    const successTime =
      this.requestsCounter === 1 &&
      JSON.parse(localStorage.getItem('successTime'))
        ? new Date(JSON.parse(localStorage.getItem('successTime')))
        : new Date();
    const successTimeString = successTime.toISOString();
    localStorage.setItem('successTime', JSON.stringify(successTimeString));

    return CurrencyActions.currencyFetchSuccess({
      currency,
      successTimeString,
    });
  }

  handleCurrencyError(errMsg: string) {
    return of(
      CurrencyActions.currencyFetchFail({
        currencyError: {
          error: errMsg,
        },
      })
    );
  }
}
