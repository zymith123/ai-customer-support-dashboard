import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LucideAngularModule } from 'lucide-angular';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { APP_ICONS } from './core/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(LucideAngularModule.pick(APP_ICONS)),
  ],
};
