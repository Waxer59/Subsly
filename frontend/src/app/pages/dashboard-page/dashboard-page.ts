import { Component } from '@angular/core';
import { DashboardHeader } from '../../components/dashboard/dashboard-header/dashboard-header';
import { DashboardBody } from '../../components/dashboard/dashboard-body/dashboard-body';

@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardHeader, DashboardBody],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {}
