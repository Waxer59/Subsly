import { Injectable } from '@angular/core';
import { User } from '../types';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private readonly _userAccount = new BehaviorSubject<User | null | undefined>(undefined);
  readonly userAccount$ = this._userAccount.asObservable();

  constructor(private http: HttpClient) {}

  loadUserAccount() {
    this.http
      .get<User>(`${environment.apiUrl}/users`, {
        withCredentials: true,
      })
      .pipe(catchError(() => of(null)))
      .subscribe((user) => {
        this._userAccount.next(user);
      });
  }

  logout() {
    this.http
      .post(`${environment.apiUrl}/auth/logout`, null, {
        withCredentials: true,
      })
      .subscribe(() => {
        this._userAccount.next(null);
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
