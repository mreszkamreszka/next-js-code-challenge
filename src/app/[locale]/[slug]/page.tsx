import { notFound } from 'next/navigation';
import getPokemon from '@/core/services/getPokemon';
import PokemonLayout from '@/layouts/PokemonLayout/PokemonLayout';
import PageWithSidebar from '@/ui/components/PageWithSidebar/PageWithSidebar';

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
    <PageWithSidebar>
      <PokemonLayout />
    </PageWithSidebar>
  );
}
