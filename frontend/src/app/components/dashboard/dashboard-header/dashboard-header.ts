import { Component, effect, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { type ChartData, type ChartOptions, type ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DasboardLoginDialog } from '../dasboard-login-dialog/dasboard-login-dialog';
import { DashboardSettingsDialog } from '../dashboard-settings-dialog/dashboard-settings-dialog';
import { UserSettingsService } from '@services/user-settings.service';
import { UserSubscriptionsService } from '@services/user-subscriptions.service';
import { Currency } from '@types';
import { CURRENCY_SYMBOLS } from '@constants';

@Component({
  selector: 'app-dashboard-header',
  imports: [BaseChartDirective, DasboardLoginDialog, DashboardSettingsDialog],
  templateUrl: './dashboard-header.html',
})
export class DashboardHeader {
  // TODO: Add empty subscriptions placeholder
  // TODO: Add subscription img
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      colors: {
        forceOverride: true,
      },
    },
  };

  doughnutChartData: ChartData<'doughnut'> = {
    datasets: [{ data: [0] }],
    labels: [],
  };

  doughnutChartType: ChartType = 'doughnut';

  spendingLabel = '';

  constructor(
    private readonly userSettingsService: UserSettingsService,
    private readonly userSubscriptionsService: UserSubscriptionsService,
  ) {
    Chart.register(annotationPlugin);

    effect(() => {
      const userSettings = userSettingsService.userSettings();
      const userSubscriptions = userSubscriptionsService.userSubscriptions();

      const spending = userSubscriptions.reduce((acc, subscription) => {
        return acc + subscription.amount / subscription.renews;
      }, 0);

      const fixedSpending = spending.toFixed(2);

      if (userSettings.currency === Currency.EUR) {
        this.spendingLabel = fixedSpending + CURRENCY_SYMBOLS[userSettings.currency];
      } else {
        this.spendingLabel = CURRENCY_SYMBOLS[userSettings.currency] + fixedSpending;
      }

      this.doughnutChartData.datasets[0].data = [];
      this.doughnutChartData.labels = [];

      userSubscriptions.forEach((subscription) => {
        const fixedAmount = +(subscription.amount / subscription.renews).toFixed(2);
        this.doughnutChartData.datasets[0].data.push(fixedAmount);
        this.doughnutChartData.labels!.push(subscription.name);
      });

      if (this.chart) {
        this.chart.update();
      }

      // In case there are suscriptions remove "0" from the chart
      if (userSubscriptions.length > 0) {
        this.doughnutChartData.datasets[0].data = this.doughnutChartData.datasets[0].data.filter(
          (value) => value !== 0,
        );
      }
    });
  }
}
