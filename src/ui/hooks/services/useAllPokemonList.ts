'use client';

import { useQuery } from '@tanstack/react-query';
import type { PokemonListDTO } from '@/core/services/dtoTypes/pokemonDto';

export type PokemonListItem = { id: number; name: string };

const POKEMON_LIST_QUERY_KEY = ['pokemon', 'all-names'];

async function fetchAllPokemonList(): Promise<PokemonListItem[]> {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as PokemonListDTO;

  return data.results.map(p => {
    const idMatch = p.url.match(/\/pokemon\/(\d+)\/?$/);
    const id = idMatch ? parseInt(idMatch[1], 10) : 0;
    return { id, name: p.name };
  });
}

export function useAllPokemonList() {
  return useQuery({
    queryKey: POKEMON_LIST_QUERY_KEY,
    queryFn: fetchAllPokemonList,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 60 * 60 * 24 * 1000, // 24 hours (formerly cacheTime)
  });
}
