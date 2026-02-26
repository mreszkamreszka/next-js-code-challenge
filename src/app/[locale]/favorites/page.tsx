import PokemonLayout from '@/layouts/PokemonLayout/PokemonLayout';
import PokemonSidebar from '@/ui/components/PokemonSidebar/PokemonSidebar';
import { PokemonSearchProvider } from '@/ui/contexts/PokemonSearchContext';

export default function Page() {
  return (
    <PokemonSearchProvider>
      <div className="mr-auto ml-auto flex min-h-screen min-w-[1295px]">
        <PokemonSidebar />
        <PokemonLayout />
      </div>
    </PokemonSearchProvider>
  );
}
