'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import PokemonCard from '@/ui/components/PokemonCard/PokemonCard';
import { useFavorites } from '@/ui/contexts/FavoritesContext';
import { useSearch } from '@/ui/contexts/SearchContext';

export default function FavoritesLayout() {
  const { favorites } = useFavorites();
  const { searchTerm } = useSearch();
  const t = useTranslations('Navigation');
  const tFavorites = useTranslations('Favorites');

  const filteredFavorites = useMemo(() => {
    const trimmed = searchTerm.toLowerCase().trim();
    if (!trimmed) return favorites;
    return favorites.filter(name => name.toLowerCase().includes(trimmed));
  }, [favorites, searchTerm]);

  return (
    <section className="w-full p-10" aria-labelledby="favorites-title">
      <h1 id="favorites-title">{t('btnFavorites')}</h1>
      {favorites.length === 0 ? (
        <p className="mt-4 text-slate-600">{tFavorites('empty')}</p>
      ) : filteredFavorites.length === 0 ? (
        <p className="mt-4 text-slate-600">{tFavorites('noSearchResults')}</p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredFavorites.map(name => (
            <li key={name} className="radius-md border-none">
              <PokemonCard pokemonName={name} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
