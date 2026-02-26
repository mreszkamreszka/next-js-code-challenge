'use server';

import type { PokemonListDTO } from '@/core/services/dtoTypes/pokemonDto';
import { transformPokemonNames } from '@/core/services/transformers/pokemonTransformer';
import api from './apiService';
import redis from './redisClient';

async function getPokemonList(
  limit: number = 20,
  offset: number = 0,
): Promise<string[]> {
  if (limit >= 100000 && offset === 0 && redis) {
    const cacheKey = 'pokemon:all-names';
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as string[];
    }

    const response = await api.get<PokemonListDTO>(
      `/pokemon?limit=${limit}&offset=${offset}`,
    );

    const names = transformPokemonNames(response.data);

    await redis.set(cacheKey, JSON.stringify(names), 'EX', 60 * 60);

    return names;
  }

  const response = await api.get<PokemonListDTO>(
    `/pokemon?limit=${limit}&offset=${offset}`,
  );

  return transformPokemonNames(response.data);
}

export default getPokemonList;
