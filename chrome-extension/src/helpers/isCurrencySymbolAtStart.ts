import { Currency } from '@/types'

export const isCurrencySymbolAtStart = (currency: Currency) => {
  return currency !== Currency.EUR
}
