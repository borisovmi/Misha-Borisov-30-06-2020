export interface Currency {
  rates: CurrencyRates;
  base: string;
  date: string;
}

export interface CurrencyRates {
  [key: string]: number;
}

export interface CurrencyError {
  error: string;
}

export interface CurrencyRequestParams {
  baseCurrencySymbol: string;
  convertionCurrencySymbol: string;
  fetchInterval: number;
}
