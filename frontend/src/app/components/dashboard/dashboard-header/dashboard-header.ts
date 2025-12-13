import { Component } from '@angular/core';
import type { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DasboardLoginDialog } from '../dasboard-login-dialog/dasboard-login-dialog';
import { DashboardSettingsDialog } from '../dashboard-settings-dialog/dashboard-settings-dialog';

@Component({
  selector: 'app-dashboard-header',
  imports: [BaseChartDirective, DasboardLoginDialog, DashboardSettingsDialog],
  templateUrl: './dashboard-header.html',
})
export class DashboardHeader {
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
    datasets: [{ data: [350, 450, 100] }],
  };
  doughnutChartType: ChartType = 'doughnut';
}
