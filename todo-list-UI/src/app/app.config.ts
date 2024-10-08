import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: environment.projectId,
        appId: environment.appId,
        storageBucket: environment.storageBucket,
        apiKey: environment.apiKey,
        authDomain: environment.authDomain,
        messagingSenderId: environment.messagingSenderId,
      })
    ),
    provideAuth(() => getAuth()),
  ],
};
