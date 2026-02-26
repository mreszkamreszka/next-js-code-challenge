'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import usePokemonList from '@/ui/hooks/services/usePokemonList';

type PokemonSearchContextValue = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredList: string[];
  loading: boolean;
  loadMore: () => void;
};

const PokemonSearchContext = createContext<
  PokemonSearchContextValue | undefined
>(undefined);

export const PokemonSearchProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const PAGE_SIZE = 20;
  const [offset, setOffset] = useState(0);

  // Paginowana lista do infinite scrolla
  const { list: pageList, loading: loadingPage } = usePokemonList(
    PAGE_SIZE,
    offset,
  );

  // Pełna lista (limit=100000, cache w Redis) do filtrowania
  const { list: fullList, loading: loadingAll } = usePokemonList(100000, 0);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(() => {
    const source = searchTerm ? fullList : pageList;

    return source.filter((name: string) =>
      name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    );
  }, [searchTerm, fullList, pageList]);

  const loadMore = useCallback(() => {
    if (loadingPage || searchTerm) return;
    setOffset(prev => prev + PAGE_SIZE);
  }, [loadingPage, searchTerm]);

  const value: PokemonSearchContextValue = {
    searchTerm,
    setSearchTerm,
    filteredList,
    loading: searchTerm ? loadingAll : loadingPage,
    loadMore,
  };

  return (
    <PokemonSearchContext.Provider value={value}>
      {children}
    </PokemonSearchContext.Provider>
  );
};

export const usePokemonSearch = () => {
  const context = useContext(PokemonSearchContext);

  if (!context) {
    throw new Error(
      'usePokemonSearch must be used within a PokemonSearchProvider',
    );
  }

  return context;
};
