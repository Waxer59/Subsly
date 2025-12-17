import { Currency } from '@types';

export const CURRENCIES = [
  { value: Currency.USD, label: 'USD' },
  { value: Currency.EUR, label: 'EUR' },
  { value: Currency.GBP, label: 'GBP' },
] as const;

export const DEFAULT_CONFIG = {
  currency: Currency.EUR,
} as const;

export const CURRENCY_SYMBOLS = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.GBP]: '£',
} as const;
