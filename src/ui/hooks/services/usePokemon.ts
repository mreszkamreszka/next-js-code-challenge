import * as React from 'react';
import type { Pokemon } from '@/core/models/pokemon';
import getPokemon from '@/core/services/getPokemon';

export default function usePokemon(name: string) {
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [loading, setLoading] = React.useState(!!name);

  React.useEffect(() => {
    if (!name) {
      setPokemon(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    (async () => {
      const response = await getPokemon(name);
      setPokemon(response);
      setLoading(false);
    })();
  }, [name]);

  return { pokemon, loading };
}
