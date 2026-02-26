import { useEffect, useState } from 'react';
import getPokemonList from '@/core/services/getPokemonList';

export default function usePokemonList(limit: number = 20, offset: number = 0) {
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchedList = await getPokemonList(limit, offset);

      setList(prev => {
        // Dla pierwszej strony lub pełnej listy po prostu nadpisujemy
        if (offset === 0) {
          return fetchedList;
        }

        const newOnes = fetchedList.filter(name => !prev.includes(name));
        return [...prev, ...newOnes];
      });

      setLoading(false);
    })();
  }, [limit, offset]);

  return { list, loading };
}
