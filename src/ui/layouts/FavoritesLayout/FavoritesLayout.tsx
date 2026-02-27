'use client';

import { useTranslations } from 'next-intl';
import PokemonCard from '@/ui/components/PokemonCard/PokemonCard';
import { useFavorites } from '@/ui/contexts/FavoritesContext';

export default function FavoritesLayout() {
  const { favorites } = useFavorites();
  const t = useTranslations('Navigation');
  const tFavorites = useTranslations('Favorites');

  return (
    <section className="w-full p-10">
      <h1>{t('btnFavorites')}</h1>
      {favorites.length === 0 ? (
        <p className="mt-4 text-slate-600">{tFavorites('empty')}</p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map(id => (
            <li key={id} className="radius-md border-none">
              <PokemonCard pokemonName={String(id)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
