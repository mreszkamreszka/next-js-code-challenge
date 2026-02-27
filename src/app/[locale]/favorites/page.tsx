import FavoritesLayout from '@/layouts/FavoritesLayout/FavoritesLayout';
import PokemonSidebar from '@/ui/components/PokemonSidebar/PokemonSidebar';

export default function Page() {
  return (
    <div className="mr-auto ml-auto flex min-h-screen min-w-[1295px]">
      <PokemonSidebar />
      <FavoritesLayout />
    </div>
  );
}
