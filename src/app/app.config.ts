import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import {provideStore, StoreModule} from '@ngrx/store';
import {provideHttpClient} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {MoviesEffects} from './state/effects/movies.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {moviesReducer} from './state/reducer/movie.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({  moviesState: moviesReducer }),
    provideEffects([MoviesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync()
]
};

