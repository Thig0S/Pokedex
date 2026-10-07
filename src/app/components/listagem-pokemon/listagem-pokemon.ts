import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map, switchMap } from 'rxjs';

interface ResultadoObjetoHttp {
  name: string;
  url: string;
}

interface ObjetoRespotasHttp {
  count: number;
  next: string | null;
  previus: string | null;
  results: ResultadoObjetoHttp[];
}
interface TipoPokemnonRespostaHttp {
  type: {
    name: string;
  };
}

interface PokemonRepostaHttp {
  id: string;
  name: string;
  types: TipoPokemnonRespostaHttp[];
  sprites: {
    front_default: string | null;
  };
}

@Component({
  imports: [],
  selector: 'app-listagem-pokemon',
  templateUrl: './listagem-pokemon.html',
})
export class ListagemPokemon {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  protected readonly objetoResposta = toSignal(
    this.http.get<ObjetoRespotasHttp>(this.apiUrl).pipe(
      // no pipe executamos funcoes chamadas operadores
      switchMap((obj) => {
        const requisicoes = obj.results.map((r) => this.http.get<PokemonRepostaHttp>(r.url));

        return forkJoin(requisicoes);
      }),
    ),
    {
      initialValue: null,
    },
  );

  constructor() {}
}
