import { notFound } from 'next/navigation';
import getPokemon from '@/core/services/getPokemon';
import PokemonLayout from '@/layouts/PokemonLayout/PokemonLayout';
import PokemonSidebar from '@/ui/components/PokemonSidebar/PokemonSidebar';
import { PokemonSearchProvider } from '@/ui/contexts/PokemonSearchContext';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pokemon = await getPokemon(slug);

  if (!pokemon) {
    notFound();
  }

  return (
    <PokemonSearchProvider>
      <div className="mr-auto ml-auto flex min-h-screen min-w-[1295px]">
        <PokemonSidebar />
        <PokemonLayout />
      </div>
    </PokemonSearchProvider>
  );
}
