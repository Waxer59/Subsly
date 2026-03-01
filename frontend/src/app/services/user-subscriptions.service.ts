import { Injectable, signal } from '@angular/core';
import { LocalStorageKey, Subscription } from '@types';
import { UserAccountService } from './user-account.service';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserSubscriptionsService {
  private readonly _userSubscriptions = signal<Subscription[]>([]);
  readonly userSubscriptions = this._userSubscriptions.asReadonly();

  constructor(
    private readonly userAccountService: UserAccountService,
    private readonly localStorageService: LocalStorageService,
    private readonly http: HttpClient,
  ) {
    userAccountService.userAccount$.subscribe((user) => {
      if (user) {
        this.loadRemoteUserSubscriptions();
      } else {
        this.loadLocalUserSubscriptions();
      }
    });
  }

  editUserSubscription(subscription: Subscription) {
    const isLoggedIn = this.userAccountService.isAuthenticated;
    if (isLoggedIn) {
      this.editRemoteUserSubscription(subscription);
    } else {
      this.editLocalUserSubscription(subscription);
    }

    const newSubscriptions = this.userSubscriptions()?.map((remoteSubscription) => {
      if (subscription.id === remoteSubscription.id) {
        return subscription;
      }
      return remoteSubscription;
    });
    this._userSubscriptions.set(newSubscriptions ?? []);
  }

  addUserSubscription(subscription: Subscription) {
    const isLoggedIn = this.userAccountService.isAuthenticated;
    if (isLoggedIn) {
      this.saveRemoteUserSubscriptions(subscription);
    } else {
      this.saveLocalUserSubscriptions(subscription);
    }
  }

  removeUserSubscription(id: string) {
    const isLoggedIn = this.userAccountService.isAuthenticated;
    if (isLoggedIn) {
      this.deleteRemoteUserSubscriptions(id);
    } else {
      this.deleteLocalUserSubscriptions(id);
    }
  }

  private loadLocalUserSubscriptions() {
    const localSubscriptions =
      this.localStorageService.get<Subscription[]>(LocalStorageKey.USER_SUBSCRIPTIONS) ?? [];

    this._userSubscriptions.set(localSubscriptions);
  }

  private loadRemoteUserSubscriptions() {
    this.http
      .get<Subscription[]>(`${environment.apiUrl}/subscriptions`, {
        withCredentials: true,
      })
      .subscribe((subscriptions) => {
        this._userSubscriptions.set(subscriptions ?? []);
      });
  }

  private saveLocalUserSubscriptions(subscription: Omit<Subscription, 'id'>) {
    const newSubscriptions = [
      ...(this.userSubscriptions() ?? []),
      {
        ...subscription,
        id: crypto.randomUUID(),
      },
    ];
    this.localStorageService.set(LocalStorageKey.USER_SUBSCRIPTIONS, newSubscriptions);
    this._userSubscriptions.set(newSubscriptions ?? []);
  }

  private saveRemoteUserSubscriptions(subscription: Subscription) {
    this.http
      .post(`${environment.apiUrl}/subscriptions`, subscription, {
        withCredentials: true,
      })
      .subscribe((data) => {
        const newSubscriptions = [...(this.userSubscriptions() ?? []), data as Subscription];
        this._userSubscriptions.set(newSubscriptions ?? []);
      });
  }

  private deleteLocalUserSubscriptions(id: string) {
    const newSubscriptions = this.userSubscriptions()?.filter(
      (subscription) => subscription.id !== id,
    );
    this.localStorageService.set(LocalStorageKey.USER_SUBSCRIPTIONS, newSubscriptions ?? []);
    this._userSubscriptions.set(newSubscriptions ?? []);
  }

  private deleteRemoteUserSubscriptions(id: string) {
    this.http
      .delete(`${environment.apiUrl}/subscriptions/${id}`, {
        withCredentials: true,
      })
      .subscribe(() => {
        const newSubscriptions = this.userSubscriptions()?.filter(
          (subscription) => subscription.id !== id,
        );
        this._userSubscriptions.set(newSubscriptions ?? []);
      });
  }

  private editLocalUserSubscription(subscription: Subscription) {
    const newSubscriptions = this.userSubscriptions()?.map((localSubscription) => {
      if (subscription.id === localSubscription.id) {
        return subscription;
      }
      return localSubscription;
    });
    this.localStorageService.set(LocalStorageKey.USER_SUBSCRIPTIONS, newSubscriptions ?? []);
    this._userSubscriptions.set(newSubscriptions ?? []);
  }

  private editRemoteUserSubscription(subscription: Subscription) {
    this.http
      .put(`${environment.apiUrl}/subscriptions/${subscription.id}`, subscription, {
        withCredentials: true,
      })
      .subscribe(() => {
        const newSubscriptions = this.userSubscriptions()?.map((remoteSubscription) => {
          if (subscription.id === remoteSubscription.id) {
            return subscription;
          }
          return remoteSubscription;
        });
        this._userSubscriptions.set(newSubscriptions ?? []);
      });
  }
}
