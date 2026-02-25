import { useEffect, useState } from 'react';
import getPokemonList from '@/core/services/getPokemonList';

export default function usePokemonList() {
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fetchedList = await getPokemonList();
      setList(fetchedList);
      setLoading(false);
    })();
  }, []);

  return { list, loading };
}
