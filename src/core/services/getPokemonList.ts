'use server';

import type { PokemonListDTO } from '@/core/services/dtoTypes/pokemonDto';
import { transformPokemonNames } from '@/core/services/transformers/pokemonTransformer';
import api from './apiService';

async function getPokemonList(limit: number = 20): Promise<string[]> {
  const response = await api.get<PokemonListDTO>(
    `/pokemon?limit=${limit}&offset=0`,
  );

  return transformPokemonNames(response.data);
}

export default getPokemonList;
