export type PokemonAbility = {
  name: string;
  slot: number;
  isHidden: boolean;
};

export type PokemonSprites = {
  backDefault: string;
  backFemale?: string;
  backShiny?: string;
  backShinyFemale?: string;
  frontDefault: string;
  frontFemale?: string;
  frontShiny?: string;
  frontShinyFemale?: string;
};

export type Pokemon = {
  name: string;
  abilities: PokemonAbility[];
  id: number;
  isDefault: boolean;
  order: number;
  sprites: PokemonSprites;
  types: string[];
  weight: number;
};
