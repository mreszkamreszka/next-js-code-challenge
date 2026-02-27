'use client';

import { useEffect, useState } from 'react';
import type { EvolutionChainItem } from '@/core/services/getPokemonChain';
import {
  getEvolutionChainId,
  getPokemonChain,
} from '@/core/services/getPokemonChain';

export default function usePokemonEvolutionChain(
  pokemonId: number | undefined,
) {
  const [chain, setChain] = useState<EvolutionChainItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!pokemonId) {
      setChain([]);
      setLoading(false);
      setNotFound(false);
      return;
    }

    setLoading(true);
    setNotFound(false);
    (async () => {
      try {
        const result = await getEvolutionChainId(pokemonId);
        if (result.ok === false) {
          setNotFound('notFound' in result && result.notFound);
          setChain([]);
          return;
        }
        const items = await getPokemonChain(result.chainId);
        setChain(items);
      } catch {
        setChain([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [pokemonId]);

  return { chain, loading, notFound };
}
