import { Currency } from "@/types"

export const API_URL = import.meta.env.VITE_API_URL

export const CURRENCY_SYMBOLS = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.GBP]: '£'
} as const