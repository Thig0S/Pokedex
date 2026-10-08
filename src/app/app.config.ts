import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { POKE_API_URL } from './pokemon/data/pokemon.service';

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' }, //diz que quando o caminho for '' vai direcionar pro caminho pokemon que tem o component
  {
    path: 'pokemon',
    //lazy loading
    loadComponent: () =>
      //import o caminho do arquivo, qnd acabar pegue a URL .listagemPokemon
      import('./pokemon/listagem/listagem-pokemon').then((component) => component.ListagemPokemon),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () =>
      import('./pokemon/detalhes/detalhes-pokemon').then((c) => c.DetalhesPokemon),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: POKE_API_URL,
      useValue: 'https://pokeapi.co/api/v2/pokemon',
    },
  ],
};
