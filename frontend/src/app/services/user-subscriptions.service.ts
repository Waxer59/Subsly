import { effect, Injectable, signal } from '@angular/core';
import { LocalStorageKey, Subscription } from '../types';
import { UserAccountService } from './user-account.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserSubscriptionsService {
  private readonly _userSubscriptions = signal<Subscription[]>([]);
  readonly userSubscriptions = this._userSubscriptions.asReadonly();

  constructor(
    private readonly userAccountService: UserAccountService,
    private readonly localStorageService: LocalStorageService,
  ) {
    effect(() => {
      const isLoggedIn = userAccountService.isLoggedIn();
      if (isLoggedIn) {
        this.loadRemoteUserSubscriptions();
      } else {
        this.loadLocalUserSubscriptions();
      }
    });
  }

  editUserSubscription(subscription: Subscription) {
    const isLoggedIn = this.userAccountService.isLoggedIn();
    if (isLoggedIn) {
      this.editRemoteUserSubscription(subscription);
    } else {
      this.editLocalUserSubscription(subscription);
    }
  }

  addUserSubscription(subscription: Omit<Subscription, 'id'>) {
    const isLoggedIn = this.userAccountService.isLoggedIn();
    if (isLoggedIn) {
      this.saveRemoteUserSubscriptions(subscription);
    } else {
      this.saveLocalUserSubscriptions(subscription);
    }
  }

  removeUserSubscription(id: string) {
    const isLoggedIn = this.userAccountService.isLoggedIn();
    if (isLoggedIn) {
      this.deleteRemoteUserSubscriptions(id);
    } else {
      this.deleteLocalUserSubscriptions(id);
    }
  }

  private loadLocalUserSubscriptions() {
    const localSubscriptions = this.localStorageService.get<Subscription[]>(
      LocalStorageKey.USER_SUBSCRIPTIONS,
    );

    if (localSubscriptions) {
      this._userSubscriptions.set(localSubscriptions);
    }
  }

  private loadRemoteUserSubscriptions() {
    console.log('remote user subscriptions');
  }

  private saveLocalUserSubscriptions(subscription: Omit<Subscription, 'id'>) {
    const localSubscriptions = this.localStorageService.get<Subscription[]>(
      LocalStorageKey.USER_SUBSCRIPTIONS,
    );
    const newSubscriptions = [
      ...(localSubscriptions ?? []),
      {
        id: crypto.randomUUID(),
        ...subscription,
      },
    ];
    this.localStorageService.set(LocalStorageKey.USER_SUBSCRIPTIONS, newSubscriptions);
  }

  private saveRemoteUserSubscriptions(subscription: Omit<Subscription, 'id'>) {
    console.log('remote', subscription);
  }

  private deleteLocalUserSubscriptions(id: string) {
    const localSubscriptions = this.localStorageService.get<Subscription[]>(
      LocalStorageKey.USER_SUBSCRIPTIONS,
    );
    const newSubscriptions = localSubscriptions?.filter((subscription) => subscription.id !== id);
    this.localStorageService.set(LocalStorageKey.USER_SUBSCRIPTIONS, newSubscriptions ?? []);
  }

  private deleteRemoteUserSubscriptions(id: string) {
    console.log('remote', id);
  }

  private editLocalUserSubscription(subscription: Subscription) {
    const localSubscriptions = this.localStorageService.get<Subscription[]>(
      LocalStorageKey.USER_SUBSCRIPTIONS,
    );
    const newSubscriptions = localSubscriptions?.map((localSubscription) => {
      if (subscription.id === localSubscription.id) {
        return subscription;
      }
      return localSubscription;
    });
    this.localStorageService.set(LocalStorageKey.USER_SUBSCRIPTIONS, newSubscriptions ?? []);
  }

  private editRemoteUserSubscription(subscription: Subscription) {
    console.log('remote', subscription);
  }
}
