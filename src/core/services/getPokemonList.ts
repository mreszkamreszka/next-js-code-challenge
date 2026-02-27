'use server';

import type {
  PokemonListDTO,
  PokemonListItem,
} from '@/core/services/dtoTypes/pokemonDto';
import {
  transformPokemonListItems,
  transformPokemonNames,
} from '@/core/services/transformers/pokemonTransformer';
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

export async function getPokemonListWithIds(
  limit: number = 20,
  offset: number = 0,
): Promise<PokemonListItem[]> {
  const response = await api.get<PokemonListDTO>(
    `/pokemon?limit=${limit}&offset=${offset}`,
  );

  return transformPokemonListItems(response.data);
}

export default getPokemonList;
