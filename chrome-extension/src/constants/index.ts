import { Currency } from '@/types'

export const API_URL = import.meta.env.VITE_API_URL

export const OTP_LENGTH = 6

export const CURRENCIES = [
  { value: Currency.USD, label: 'USD' },
  { value: Currency.EUR, label: 'EUR' },
  { value: Currency.GBP, label: 'GBP' }
] as const

export const CURRENCY_SYMBOLS = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.GBP]: '£'
} as const
