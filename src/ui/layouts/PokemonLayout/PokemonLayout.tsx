'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import PokemonCard from '@/ui/components/PokemonCard/PokemonCard';
import useFilteredPokemonList from '@/ui/hooks/services/useFilteredPokemonList';

const PAGE_SIZE = 20;

const PokemonLayout: React.FC = () => {
  const { filteredList, loading, hasSearchTerm } = useFilteredPokemonList();
  const [infiniteVisibleCount, setInfiniteVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Homepage');

  const displayedPokemons = hasSearchTerm
    ? filteredList.slice(0, PAGE_SIZE)
    : filteredList.slice(0, infiniteVisibleCount);

  const loadMore = useCallback(() => {
    if (hasSearchTerm) return;
    setInfiniteVisibleCount(prev => prev + PAGE_SIZE);
  }, [hasSearchTerm]);

  const isLoadingMoreRef = useRef(false);
  const hasScrolledRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) hasScrolledRef.current = true;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (hasSearchTerm || loading) return () => {};

    const sentinel = sentinelRef.current;
    if (!sentinel) return () => {};

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          !isLoadingMoreRef.current &&
          hasScrolledRef.current
        ) {
          isLoadingMoreRef.current = true;
          loadMore();
          timeoutRef.current = setTimeout(() => {
            isLoadingMoreRef.current = false;
          }, 300);
        } else {
          isLoadingMoreRef.current = false;
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
          }
        }
      },
      { rootMargin: '200px', threshold: 0 },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loadMore, loading, hasSearchTerm, displayedPokemons.length]);

  return (
    <section className="w-full p-10">
      <h1>{t('title')}</h1>
      {loading && <p>Loading...</p>}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayedPokemons.map(name => (
          <li key={name} className="radius-md border-none">
            <PokemonCard pokemonName={name} />
          </li>
        ))}
      </ul>
      {!hasSearchTerm && displayedPokemons.length < filteredList.length && (
        <div ref={sentinelRef} aria-hidden className="h-1" />
      )}
    </section>
  );
};

export default PokemonLayout;
