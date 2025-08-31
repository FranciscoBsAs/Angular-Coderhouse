import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { authReducer } from './core/authNgRx/auth.reducer';
import { usersNgRxReducer } from './core/users/usersNgRx/users.reducer';
import { AuthEffects } from './core/authNgRx/auth.effects';
import { UsersNgRxEffects } from './core/users/usersNgRx/users.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig : ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //new one, HTTP
    provideHttpClient(),
    provideStore({
        auth: authReducer,
        usersNgRx: usersNgRxReducer
    }),
    provideEffects([AuthEffects, UsersNgRxEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
