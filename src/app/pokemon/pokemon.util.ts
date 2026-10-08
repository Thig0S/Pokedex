export const DEFAULT_TYPE_COLOR = '#6c757d';

export const TYPE_COLORS: Readonly<Record<string, string>> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export function paraTitleCase(texto: string): string {
  return texto.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
}

export function obterCorDoTipo(type: string): string {
  return TYPE_COLORS[type] ?? DEFAULT_TYPE_COLOR;
}

export function obterCorDeBackgroundDosTipos(tipo: PokemonTypeViewModel[]): string {
  const primeiraCor = tipo[0]?.color ?? DEFAULT_TYPE_COLOR;
  const segundaCor = tipo[1]?.color ?? [primeiraCor];

  return `linear-gradient(#182033,#182033) padding-box, linear-gradient(135deg, ${primeiraCor} 0 50%, ${segundaCor} 50% 100%) border-box`;
}

export interface PokemonTypeViewModel {
  readonly name: string;
  readonly displayName: string;
  readonly color: string;
}
