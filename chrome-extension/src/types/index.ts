export interface User {
  id: string
  username: string
  profile_picture: string
}

export interface Subscription {
  id: string
  name: string
  amount: number
  renewsEvery: number
  serviceUrl: string
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP'
}
