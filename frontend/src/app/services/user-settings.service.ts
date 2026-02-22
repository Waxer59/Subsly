import { effect, Injectable, signal } from '@angular/core';
import { LocalStorageKey, UserSettings } from '../types';
import { DEFAULT_CONFIG } from '../constants';
import { UserAccountService } from './user-account.service';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private readonly _userSettings = signal<UserSettings>(DEFAULT_CONFIG);
  readonly userSettings = this._userSettings.asReadonly();

  constructor(
    private readonly userAccountService: UserAccountService,
    private readonly localStorageService: LocalStorageService,
    private readonly http: HttpClient,
  ) {
    effect(() => {
      const isLoggedIn = userAccountService.isAuthenticated;
      if (isLoggedIn) {
        this.loadRemoteConfig();
      } else {
        this.loadLocalConfig();
      }
    });
  }

  editUserSettings(value: UserSettings) {
    const isLoggedIn = this.userAccountService.isAuthenticated;
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

  private editRemoteUserSettings(value: UserSettings) {
    this.http
      .put(`${environment.apiUrl}/user-config`, value, {
        withCredentials: true,
      })
      .subscribe(() => {
        this._userSettings.set(value);
      });
  }

  private loadLocalConfig() {
    const localSettings = this.localStorageService.get<UserSettings>(LocalStorageKey.USER_SETTINGS);

    if (localSettings) {
      this._userSettings.set(localSettings);
    }
  }

  private loadRemoteConfig() {
    this.http
      .get<UserSettings>(`${environment.apiUrl}/user-config`, {
        withCredentials: true,
      })
      .subscribe((userSettings) => {
        this._userSettings.set(userSettings);
      });
  }
}
