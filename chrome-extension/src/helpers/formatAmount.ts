import { CURRENCY_SYMBOLS } from '@/constants'
import { isCurrencySymbolAtStart } from './isCurrencySymbolAtStart'
import { Currency } from '@/types'

export const formatAmount = (amount: number, currency: Currency) => {
  const currencySymbol = CURRENCY_SYMBOLS[currency]
  const formattedAmount = amount.toFixed(2)

  return isCurrencySymbolAtStart(currency)
    ? currencySymbol + formattedAmount
    : formattedAmount + currencySymbol
}
