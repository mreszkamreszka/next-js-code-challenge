import * as React from 'react';
import type { Pokemon } from '@/core/models/pokemon';
import getPokemon from '@/core/services/getPokemon';

export default function usePokemon(name: string) {
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const response = await getPokemon(name);
      setPokemon(response);
      setLoading(false);
    })();
  }, [name]);

  return { pokemon, loading };
}
