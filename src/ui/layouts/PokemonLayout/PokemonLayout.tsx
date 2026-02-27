'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import PokemonCard from '@/ui/components/PokemonCard/PokemonCard';
import { useSearch } from '@/ui/contexts/SearchContext';
import useFilteredPokemonList from '@/ui/hooks/services/useFilteredPokemonList';

const PAGE_SIZE = 20;

function PokemonListWithInfiniteScroll() {
  const { filteredList, loading } = useFilteredPokemonList();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const hasScrolledRef = useRef(false);

  const displayedPokemons = filteredList.slice(0, visibleCount);
  const hasMore = visibleCount < filteredList.length;

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) hasScrolledRef.current = true;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!hasMore || loading) return () => {};

    const sentinel = sentinelRef.current;
    if (!sentinel) return () => {};

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !isFetchingRef.current &&
          hasScrolledRef.current
        ) {
          isFetchingRef.current = true;
          loadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  useEffect(() => {
    isFetchingRef.current = false;
  }, [visibleCount]);

  return (
    <>
      {loading && (
        <p aria-live="polite" aria-busy="true">
          Loading...
        </p>
      )}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayedPokemons.map(name => (
          <li key={name} className="radius-md border-none">
            <PokemonCard pokemonName={name} />
          </li>
        ))}
      </ul>
      {hasMore && <div ref={sentinelRef} aria-hidden className="h-1" />}
    </>
  );
}

const PokemonLayout: React.FC = () => {
  const { searchTerm } = useSearch();
  const t = useTranslations('Homepage');

  return (
    <section className="w-full p-10" aria-labelledby="homepage-title">
      <h1 id="homepage-title">{t('title')}</h1>
      <PokemonListWithInfiniteScroll key={searchTerm} />
    </section>
  );
};

export default PokemonLayout;
