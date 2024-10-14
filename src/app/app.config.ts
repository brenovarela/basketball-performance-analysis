// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { Select2Module } from 'ng-select2-component'; // Importa o módulo Select2

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Suas rotas, se houver

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(Select2Module), provideAnimationsAsync() // Adiciona o Select2Module aqui
  ]
};
