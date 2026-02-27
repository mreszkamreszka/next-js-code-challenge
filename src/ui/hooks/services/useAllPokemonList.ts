'use client';

import { useQuery } from '@tanstack/react-query';
import type { PokemonListItem } from '@/core/services/dtoTypes/pokemonDto';
import { getPokemonListWithIds } from '@/core/services/getPokemonList';

export type { PokemonListItem };

const POKEMON_LIST_QUERY_KEY = ['pokemon', 'all-names'];

export function useAllPokemonList() {
  return useQuery({
    queryKey: POKEMON_LIST_QUERY_KEY,
    queryFn: () => getPokemonListWithIds(2000, 0),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 60 * 60 * 24 * 1000, // 24 hours (formerly cacheTime)
  });
}
