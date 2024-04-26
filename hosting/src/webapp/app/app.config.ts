import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';

import { ApiBaseUrlInterceptor } from './interceptors/api-base-url.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { TemplatePageTitleStrategy } from './services/title-strategy.service';
import { routes } from './app.routes';
import { graphqlProvider } from './graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ApiBaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500, horizontalPosition: 'end', panelClass: ['pr-4', 'pb-3'] },
    },
    graphqlProvider,
  ],
};
