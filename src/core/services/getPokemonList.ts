'use server';

import type { PokemonListDTO } from '@/core/services/dtoTypes/pokemonDto';
import { transformPokemonNames } from '@/core/services/transformers/pokemonTransformer';
import api from './apiService';

async function getPokemonList(
  limit: number = 20,
  offset: number = 0,
): Promise<string[]> {
  const response = await api.get<PokemonListDTO>(
    `/pokemon?limit=${limit}&offset=${offset}`,
  );

  return transformPokemonNames(response.data);
}

export default getPokemonList;
