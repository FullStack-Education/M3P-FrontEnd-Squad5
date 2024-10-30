import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideIcons } from '@ng-icons/core';
import {
  heroArrowRightStartOnRectangle,
  heroBars3,
  heroChevronRight,
  heroHome,
  heroXMark,
  heroUserGroup,
  heroChartBar,
  heroAcademicCap,
  heroIdentification,
  heroPaperClip,
  heroDocumentChartBar,
  heroUserCircle,
  heroPencil,
} from '@ng-icons/heroicons/outline';
import { MenuLateralComponent } from './shared/components/menu-lateral/menu-lateral.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideIcons({
      heroBars3,
      heroXMark,
      heroArrowRightStartOnRectangle,
      heroHome,
      heroChevronRight,
      heroUserGroup,
      heroChartBar,
      heroAcademicCap,
      heroIdentification,
      heroPaperClip,
      heroDocumentChartBar,
      heroUserCircle,
      heroPencil
    }),
    MenuLateralComponent,
  ],
};
