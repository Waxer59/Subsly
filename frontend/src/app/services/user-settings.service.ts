import { effect, Injectable, signal } from '@angular/core';
import { LocalStorageKey, UserSettings } from '../types';
import { DEFAULT_CONFIG } from '../constants';
import { UserAccountService } from './user-account.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private readonly _userSettings = signal<UserSettings>(DEFAULT_CONFIG);
  readonly userSettings = this._userSettings.asReadonly();

  constructor(
    private readonly userAccountService: UserAccountService,
    private readonly localStorageService: LocalStorageService,
  ) {
    effect(() => {
      const isLoggedIn = userAccountService.isLoggedIn();
      if (isLoggedIn) {
        this.loadRemoteConfig();
      } else {
        this.loadLocalConfig();
      }
    });
  }

  editUserSettings(value: Partial<UserSettings>) {
    const isLoggedIn = this.userAccountService.isLoggedIn();
    if (isLoggedIn) {
      this.editRemoteUserSettings(value);
    } else {
      this.editLocalUserSettings(value);
    }
  }

  private editLocalUserSettings(value: Partial<UserSettings>) {
    this._userSettings.set({ ...this._userSettings(), ...value });
    this.localStorageService.set(LocalStorageKey.USER_SETTINGS, this._userSettings());
  }

  private editRemoteUserSettings(value: Partial<UserSettings>) {
    console.log('remote', value);
  }

  private loadLocalConfig() {
    const localSettings = this.localStorageService.get<UserSettings>(LocalStorageKey.USER_SETTINGS);

    if (localSettings) {
      this._userSettings.set(localSettings);
    }
  }

  private loadRemoteConfig() {
    console.log('remote config');
  }
}
