import { Component, OnInit } from '@angular/core';
import { DashboardHeader } from '../../components/dashboard/dashboard-header/dashboard-header';
import { DashboardBody } from '../../components/dashboard/dashboard-body/dashboard-body';
import { Footer } from '@/common/components/footer/footer';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { LocalStorageService } from '@/services/local-storage.service';
import { LocalStorageKey, Subscription, UserSettings } from '@/types';

@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardHeader, DashboardBody, Footer],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService,
  ) {}

  private areSubscriptionsInitialized = false;
  private isConfigInitialized = false;

  ngOnInit(): void {
    this.initializeSubscriptions();
    this.initializeConfig();
  }

  initializeConfig() {
    if (this.isConfigInitialized) {
      return;
    }

    const localUserConfig = this.localStorageService.get<UserSettings[]>(
      LocalStorageKey.USER_SETTINGS,
    );

    this.http
      .post(`${environment.apiUrl}/user-config/initialize`, localUserConfig, {
        withCredentials: true,
      })
      .subscribe(() => {});

    this.isConfigInitialized = true;
  }

  initializeSubscriptions() {
    if (this.areSubscriptionsInitialized) {
      return;
    }

    const localSavedSubscriptions = this.localStorageService.get<Subscription[]>(
      LocalStorageKey.USER_SUBSCRIPTIONS,
    );

    this.http
      .post(`${environment.apiUrl}/subscriptions/initialize`, localSavedSubscriptions, {
        withCredentials: true,
      })
      .subscribe(() => {});

    this.areSubscriptionsInitialized = true;
  }
}
