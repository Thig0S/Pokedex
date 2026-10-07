import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonService } from '../data/pokemon.service';
import { Pokemon } from '../pokemon.model';

export function paraTitleCase(texto: string): string {
  return texto.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
}

@Component({
  imports: [],
  selector: 'app-listagem-pokemon',
  templateUrl: './listagem-pokemon.html',
})
export class ListagemPokemon {
  protected readonly pokemonService = inject(PokemonService);
  protected readonly objetoResposta = toSignal(this.pokemonService.listar(), {
    initialValue: [] as Pokemon[],
  });

  protected readonly paraTitleCasa = paraTitleCase;
}
