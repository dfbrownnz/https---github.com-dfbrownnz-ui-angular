import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

import { QueryClient, provideTanStackQuery } from '@tanstack/angular-query-experimental';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { globalErrorInterceptor } from './core/error.interceptor';

import { provideHighlightOptions } from 'ngx-highlightjs';
import { ProjectService } from './core/project.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DebugHeaderInterceptor } from './core/debug-header.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // provideRouter(routes),
    provideRouter(routes, withComponentInputBinding()),
    ProjectService,
    provideHttpClient(
      withInterceptors([globalErrorInterceptor]) // Register here
    ),
    provideTanStackQuery(new QueryClient()),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js'),
    }),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: DebugHeaderInterceptor, multi: true }
  ]
};
