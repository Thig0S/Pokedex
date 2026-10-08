export interface ResultadoObjetoHttp {
  name: string;
  url: string;
}

export interface ObjetoRespotasHttp {
  count: number;
  next: string | null;
  previus: string | null;
  results: ResultadoObjetoHttp[];
}
export interface TipoPokemnonRespostaHttp {
  type: {
    name: string;
  };
}

export interface PokemonRespostaHttp {
  id: number;
  name: string;
  types: TipoPokemnonRespostaHttp[];
  sprites: {
    front_default: string | null;
  };
}
