import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { ObjetoRespotasHttp, PokemonRespostaHttp } from './pokemon.dto';
import { Pokemon } from '../pokemon.model';

export const POKE_API_URL = new InjectionToken<string>('POKE_API_URL');

function mapearRespostaPokemon(dto : PokemonRespostaHttp) : Pokemon{
  return {
          id: dto.id,
          name: dto.name.toUpperCase(),
          types: dto.types.map((item) => item.type.name),
          sprite: dto.sprites.front_default,  }
}

@Injectable({
  providedIn: 'root', //a injecao e promovida na raiz do projeto
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(POKE_API_URL);

  listar(): Observable<Pokemon[]> {
    return this.http.get<ObjetoRespotasHttp>(this.apiUrl).pipe(
      // no pipe executamos funcoes chamadas operadores
      switchMap((obj) => {
        const requisicoes = obj.results.map((r) => this.http.get<PokemonRespostaHttp>(r.url));

        //forkjoin espera todas as requisições terminarem e emite um array
        //com as respostas na mesma ordem das requisicoes
        return forkJoin(requisicoes);
      }),
      //esse map é do RxJS: transforma a emissão do Observable(task)
      map((detalhes: PokemonRespostaHttp[]): Pokemon[] => {
        return detalhes.map(mapearRespostaPokemon);
      }),
    );
  }
}
