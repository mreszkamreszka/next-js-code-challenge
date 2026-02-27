'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

const STORAGE_KEY = 'pokemon-favorites';

type FavoritesContextValue = {
  favorites: string[];
  addFavorite: (name: string) => void;
  removeFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

function loadFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as (string | number)[];
    return parsed.map(item => String(item));
  } catch {
    return [];
  }
}

function saveToStorage(names: string[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
}

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(loadFromStorage());

  const addFavorite = useCallback((name: string) => {
    const normalized = name.toLowerCase();
    setFavorites(prev => {
      if (prev.some(f => f.toLowerCase() === normalized)) return prev;
      const next = [...prev, normalized];
      saveToStorage(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((name: string) => {
    const normalized = name.toLowerCase();
    setFavorites(prev => {
      const next = prev.filter(f => f.toLowerCase() !== normalized);
      saveToStorage(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (name: string) =>
      favorites.some(f => f.toLowerCase() === name.toLowerCase()),
    [favorites],
  );

  const value: FavoritesContextValue = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
