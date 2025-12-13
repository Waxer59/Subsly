import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  LucideAngularModule,
  Github,
  Eye,
  TrendingDown,
  PiggyBank,
  Chromium,
  LogIn,
  X,
  Plus,
  Settings,
  Pencil,
  Trash,
} from 'lucide-angular';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Github,
        Eye,
        TrendingDown,
        PiggyBank,
        Chromium,
        LogIn,
        X,
        Plus,
        Settings,
        Pencil,
        Trash,
      }),
    ),
    provideCharts(withDefaultRegisterables()),
  ],
};
