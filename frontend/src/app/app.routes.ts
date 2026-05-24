import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { userResolver } from './resolvers/user.resolver';
import { NotFound } from './pages/not-found/not-found';
import { dashboardRedirectGuard } from './guards/dashboard-redirect-guard';
import { PrivacyPolicyPage } from './pages/privacy-policy/privacy-policy';

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
    path: 'privacy-policy',
    component: PrivacyPolicyPage,
  },
  {
    path: '**',
    component: NotFound,
  },
];
