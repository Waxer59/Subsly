export interface User {
  name: string;
  avatar: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  renews: number;
  serviceUrl: string;
}
