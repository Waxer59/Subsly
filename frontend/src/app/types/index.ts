export interface User {
  name: string;
  avatar: string;
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

export enum LocalStorageKey {
  USER_SUBSCRIPTIONS = 'subsly-user-subscriptions',
  USER_SETTINGS = 'subsly-user-settings',
}

export interface UserSettings {
  currency: Currency;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  renews: number;
  serviceUrl: string;
}
