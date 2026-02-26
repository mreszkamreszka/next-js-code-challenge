'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import PokemonCard from '@/ui/components/PokemonCard/PokemonCard';
import { usePokemonSearch } from '@/ui/contexts/PokemonSearchContext';

const PokemonLayout: React.FC = () => {
  const { filteredList, loading, loadMore } = usePokemonSearch();
  const t = useTranslations('Homepage');
  const canTriggerLoadMoreRef = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (!nearBottom) {
        canTriggerLoadMoreRef.current = true;
        return;
      }

      if (canTriggerLoadMoreRef.current && !loading) {
        canTriggerLoadMoreRef.current = false;
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMore, loading]);

  return (
    <section className="w-full p-10">
      <h1>{t('title')}</h1>
      {loading && <p>Loading...</p>}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredList.map(name => (
          <li key={name} className="radius-md border-none">
            <PokemonCard pokemonName={name} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PokemonLayout;
