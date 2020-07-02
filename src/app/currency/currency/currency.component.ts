import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { currencyFetchStart } from '../store/currency.actions';
import { Observable } from 'rxjs';
import { CurrencyState } from '../store/currency.reducers';
import {
  currencyUpdated,
  currencySuccessTimeUpdated,
} from '../store/currency.selector';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Currency } from '../models/currency';
import { timeIntervalValidator } from 'src/app/shopping/utilities/timeInterval.validator';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  currenciesList = ['ILS', 'USD'];
  intervalsList = [
    3000, // 3s
    10000, // 10s
    30000, // 30s
    60000, // 1m
    120000, // 2m
    300000, // 5m
    600000, // 10m
    1800000, // 30m
  ];

  updateTimestamp$: Observable<string>;
  currency$: Observable<Currency>;

  currencyForm = new FormGroup({
    convertionCurrency: new FormControl({ value: '' }, [
      Validators.required,
      Validators.pattern(/^[A-Z]{3}$/),
    ]),
    updateInterval: new FormControl({ value: null }, [
      Validators.min(1000),
      timeIntervalValidator(),
    ]),
  });

  constructor(private fb: FormBuilder, private store: Store<CurrencyState>) {}

  ngOnInit(): void {
    this.currencyForm.valueChanges.subscribe((f) => {
      this.store.dispatch(
        currencyFetchStart({
          currencyRequestParams: {
            baseCurrencySymbol: 'USD',
            convertionCurrencySymbol: f.convertionCurrency,
            fetchInterval: f.updateInterval,
          },
        })
      );
    });

    this.initFormValue();

    this.updateTimestamp$ = this.store.pipe(select(currencySuccessTimeUpdated));
    this.currency$ = this.store.pipe(select(currencyUpdated));
  }

  initFormValue() {
    this.currencyForm.setValue({
      convertionCurrency: this.currenciesList[0],
      updateInterval: this.intervalsList[0],
    });
  }
}
