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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'atom-angular-todo',
        appId: '1:993218519320:web:5bb14d94c60aeeefe6be6d',
        storageBucket: 'atom-angular-todo.appspot.com',
        apiKey: 'AIzaSyCCaW_Q8UDtSSLK2xsxCorVmyBYfhqdHUY',
        authDomain: 'atom-angular-todo.firebaseapp.com',
        messagingSenderId: '993218519320',
      })
    ),
    provideAuth(() => getAuth()),
  ],
};
