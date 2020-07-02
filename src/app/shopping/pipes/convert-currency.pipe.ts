import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from 'src/app/currency/models/currency';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'convertCurrency',
})
export class ConvertCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: number, convertionCurrency: Currency): string {
    if (convertionCurrency) {
      const converted = value * Object.values(convertionCurrency.rates)[0];
      return this.currencyPipe.transform(
        converted,
        Object.keys(convertionCurrency.rates)[0]
      );
    }
    return null;
  }
}
