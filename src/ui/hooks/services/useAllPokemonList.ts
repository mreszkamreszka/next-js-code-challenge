'use client';

import { useQuery } from '@tanstack/react-query';
import getPokemonList from '@/core/services/getPokemonList';

const POKEMON_LIST_QUERY_KEY = ['pokemon', 'all-names'];

export default function useAllPokemonList() {
  return useQuery({
    queryKey: POKEMON_LIST_QUERY_KEY,
    queryFn: () => getPokemonList(2000, 0),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 60 * 60 * 24 * 1000, // 24 hours (formerly cacheTime)
  });
}
