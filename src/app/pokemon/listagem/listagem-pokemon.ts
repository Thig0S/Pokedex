import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonService } from '../data/pokemon.service';
import { Pokemon } from '../pokemon.model';
import { map } from 'rxjs';
import {
  obterCorDeBackgroundDosTipos,
  obterCorDoTipo,
  paraTitleCase,
  PokemonTypeViewModel,
} from '../pokemon.util';
import { RouterLink } from '@angular/router';

interface PokemonCardViewModel {
  readonly id: number;
  readonly name: string;
  readonly displayName: string;
  readonly imageUrl: string | null;
  readonly imageAlt: string;
  readonly types: readonly PokemonTypeViewModel[];
  readonly backgroundColor: string;
}

export function paraCardViewModel(dto: Pokemon): PokemonCardViewModel {
  const displayName = paraTitleCase(dto.name);

  const types = dto.types.map((t) => ({
    name: t,
    displayName: paraTitleCase(t),
    color: obterCorDoTipo(t),
  }));

  return {
    id: dto.id,
    name: dto.name,
    displayName: displayName,
    imageUrl: dto.sprite,
    imageAlt: `Imagem de ${displayName}`,
    types: types,
    backgroundColor: obterCorDeBackgroundDosTipos(types),
  };
}

@Component({
  imports: [RouterLink],
  selector: 'app-listagem-pokemon',
  templateUrl: './listagem-pokemon.html',
  styleUrl: './listagem-pokemon.scss',
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
