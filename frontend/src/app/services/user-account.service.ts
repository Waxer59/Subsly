import { computed, Injectable, signal } from '@angular/core';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private readonly _userAccount = signal<User | null>(null);
  readonly isLoggedIn = computed(() => Boolean(this._userAccount()));
  readonly userAccount = this._userAccount.asReadonly();

  loadUserAccount() {
    setTimeout(() => {
      this._userAccount.set(null);
    }, 1000);
  }
}
