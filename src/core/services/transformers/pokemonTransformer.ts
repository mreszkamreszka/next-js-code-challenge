import type {
  Pokemon,
  PokemonAbility,
  PokemonSprites,
} from '@/core/models/pokemon';
import type {
  AbilityDTO,
  PokemonDTO,
  PokemonListDTO,
  SpritesDTO,
} from '@/core/services/dtoTypes/pokemonDto';

function transformType(response: { type: { name: string } }) {
  return response.type.name;
}

function transformAbility(response: AbilityDTO): PokemonAbility {
  return {
    name: response.name,
    isHidden: response.is_hidden,
    slot: response.slot,
  };
}

function transformSprites(response: SpritesDTO): PokemonSprites {
  return {
    backDefault: response.back_default,
    backShiny: response.back_shiny ?? undefined,
    backFemale: response.back_female ?? undefined,
    backShinyFemale: response.back_shiny_female ?? undefined,
    frontDefault: response.front_default,
    frontShiny: response.front_shiny ?? undefined,
    frontFemale: response.front_female ?? undefined,
    frontShinyFemale: response.front_shiny_female ?? undefined,
  };
}

export function transformPokemon(response: PokemonDTO): Pokemon {
  const pokemon: Pokemon = {
    name: response.name,
    abilities: response.abilities.map(transformAbility),
    sprites: transformSprites(response.sprites),
    isDefault: response.is_default,
    order: response.order,
    id: response.id,
    types: response.types.map(transformType),
    weight: response.weight,
  };

  return pokemon;
}

export function transformPokemonNames(pokemons: PokemonListDTO): string[] {
  return pokemons.results.map(pokemon => pokemon.name);
}

// export function transformPokemonEvolutionChain(
//     response: any,
//     chain: string[] = [],
// ): string[] {
//     chain.push(response.species.name);
//     const first = response.evolves_to[0];
//     if (first) {
//         transformPokemonEvolutionChain(first, chain);
//     }

//     return chain;
// }
