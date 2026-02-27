'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import PokemonCard from '@/ui/components/PokemonCard/PokemonCard';
import { useFavorites } from '@/ui/contexts/FavoritesContext';
import { useSearch } from '@/ui/contexts/SearchContext';
import { useAllPokemonList } from '@/ui/hooks/services/useAllPokemonList';

export default function FavoritesLayout() {
  const { favorites } = useFavorites();
  const { searchTerm } = useSearch();
  const { data: allPokemon = [] } = useAllPokemonList();
  const t = useTranslations('Navigation');
  const tFavorites = useTranslations('Favorites');

  const filteredFavorites = useMemo(() => {
    const trimmedSearchTerm = searchTerm.toLowerCase().trim();

    if (!trimmedSearchTerm) {
      return favorites;
    }

    const idToName = new Map(allPokemon.map(p => [p.id, p.name]));

    return favorites.filter(id => {
      const name = idToName.get(id) ?? String(id);
      return name.toLowerCase().includes(trimmedSearchTerm);
    });
  }, [favorites, searchTerm, allPokemon]);

  return (
    <section className="w-full p-10">
      <h1>{t('btnFavorites')}</h1>
      {favorites.length === 0 ? (
        <p className="mt-4 text-slate-600">{tFavorites('empty')}</p>
      ) : filteredFavorites.length === 0 ? (
        <p className="mt-4 text-slate-600">{tFavorites('noSearchResults')}</p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredFavorites.map(id => (
            <li key={id} className="radius-md border-none">
              <PokemonCard pokemonName={String(id)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
