'use client';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import PokemonCard from '@/ui/components/PokemonCard/PokemonCard';
import usePokemonList from '@/ui/hooks/services/usePokemonList';

const PokemonLayout: React.FC = () => {
  const { list } = usePokemonList();
  const t = useTranslations('Homepage');

  return (
    <section className="p-10">
      <h1>{t('title')}</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map(name => (
          <li key={name} className="radius-md border-none">
            <PokemonCard pokemonName={name} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PokemonLayout;
