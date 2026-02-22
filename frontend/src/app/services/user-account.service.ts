import { inject, Injectable } from '@angular/core';
import { User } from '../types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private readonly http = inject(HttpClient);
  private readonly _userAccount = new BehaviorSubject<User | null | undefined>(undefined);
  readonly userAccount$ = this._userAccount.asObservable();

  loadUserAccount() {
    this.http
      .get<User>(`${environment.apiUrl}/users`, {
        withCredentials: true,
      })
      .subscribe((user) => {
        this._userAccount.next(user);
      });
  }

  get user() {
    return this._userAccount.getValue();
  }

  get hasLoadedUser() {
    return this._userAccount.getValue() !== undefined;
  }

  get isAuthenticated() {
    return this.user !== null;
  }
}
