'use client';

import { useMemo } from 'react';
import { useSearch } from '@/ui/contexts/SearchContext';
import { useAllPokemonList } from '@/ui/hooks/services/useAllPokemonList';

export default function useFilteredPokemonList() {
  const { data: allPokemon = [], isLoading } = useAllPokemonList();
  const { searchTerm } = useSearch();

  const hasSearchTerm = searchTerm.trim().length > 0;

  const filteredList = useMemo(() => {
    const trimmed = searchTerm.toLowerCase().trim();
    const names = allPokemon.map(p => p.name);

    if (!trimmed) {
      return names;
    }

    return names.filter(name => name.toLowerCase().includes(trimmed));
  }, [searchTerm, allPokemon]);

  return {
    filteredList,
    loading: isLoading,
    hasSearchTerm,
  };
}
