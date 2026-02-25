export type AbilityDTO = {
  name: string;
  slot: number;
  is_hidden: boolean;
};

export type SpritesDTO = {
  back_default: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
};

type PokemonDefinitionDTO = {
  name: string;
  url: string;
};

export type PokemonDTO = {
  abilities: AbilityDTO[];
  base_experience: number;
  forms: PokemonDefinitionDTO[];
  height: number;
  id: number;
  is_default: boolean;
  name: string;
  order: number;
  sprites: SpritesDTO;
  weight: number;
  types: {
    slot: number;
    type: PokemonDefinitionDTO;
  }[];
};

export type PokemonListDTO = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDefinitionDTO[];
};
