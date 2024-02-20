import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { TitleStrategy, provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { TemplatePageTitleStrategy } from './services/title-strategy.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'ch0pch0p-web',
          appId: '1:564414593587:web:3ba567b0325f30e52dc146',
          storageBucket: 'ch0pch0p-web.appspot.com',
          apiKey: 'AIzaSyApXKBua_gerUMQHIHF9WoJVFvSh7Tg09Q',
          authDomain: 'ch0pch0p-web.firebaseapp.com',
          messagingSenderId: '564414593587',
          measurementId: 'G-Y3DGPP50TJ',
        })
      )
    ),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
  ],
};
