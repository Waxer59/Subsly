import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { userResolver } from './resolvers/user.resolver';
import { NotFound } from './pages/not-found/not-found';
import { dashboardRedirectGuard } from './guards/dashboard-redirect-guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    canActivate: [dashboardRedirectGuard],
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    resolve: {
      isLoggedIn: userResolver,
    },
  },
  {
    path: '**',
    component: NotFound,
  },
];
