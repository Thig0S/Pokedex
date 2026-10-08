import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonService } from '../data/pokemon.service';
import { Pokemon } from '../pokemon.model';
import { map } from 'rxjs';

interface PokemonTypeViewModel {
  readonly name: string;
  readonly displayName: string;
}

interface PokemonCardViewModel {
  readonly id: number;
  readonly displayName: string;
  readonly imageUrl: string | null;
  readonly imageAlt: string;
  readonly types: readonly PokemonTypeViewModel[];
}

export function paraTitleCase(texto: string): string {
  return texto.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
}

export function paraCardViewModel(dto: Pokemon): PokemonCardViewModel {
  const displayName = paraTitleCase(dto.name);
  const types = dto.types.map((t) => ({
    name: t,
    displayName: paraTitleCase(t),
  }));

  return {
    id: dto.id,
    displayName: displayName,
    imageUrl: dto.sprite,
    imageAlt: `Imagem de ${displayName}`,
    types: types,
  };
}

@Component({
  imports: [],
  selector: 'app-listagem-pokemon',
  templateUrl: './listagem-pokemon.html',
})
export class ListagemPokemon {
  protected readonly pokemonService = inject(PokemonService);
  protected readonly objetoResposta = toSignal(
    this.pokemonService.listar().pipe(map((pokemon) => pokemon.map(paraCardViewModel))),
    {
      initialValue: [] as PokemonCardViewModel[],
    },
  );
}
