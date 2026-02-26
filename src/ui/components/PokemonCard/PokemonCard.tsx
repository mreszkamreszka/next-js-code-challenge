import type { FC } from 'react';
import Image from 'next/image';
import { Link } from '@/core/navigation/navigation';
import DotsSVG from '@/public/assets/dots.svg';
import usePokemon from '@/ui/hooks/services/usePokemon';

type PokemonCardProps = {
  pokemonName: string;
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemonName }) => {
  const { pokemon } = usePokemon(pokemonName);

  if (!pokemon) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-sm bg-white shadow-md transition hover:shadow-xl">
      {/* Top section */}
      <div className="relative flex h-56 items-center justify-center bg-[#F6F6FF]">
        <span className="absolute top-3 left-3 rounded-xs bg-violet-600 px-2 py-1 text-xs text-white">
          {pokemon.id}
        </span>
        {pokemon.sprites.frontDefault ? (
          <Image
            src={pokemon.sprites.frontDefault}
            alt={pokemon.name}
            width={100}
            height={100}
            className="h-36 object-contain"
          />
        ) : (
          // TODO: Add a placeholder image
          <div className="h-36 bg-gray-200 object-contain" />
        )}
      </div>

      {/* Bottom section */}
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className="truncate font-semibold text-slate-800 capitalize">
          {pokemon.name}
        </h2>

        <button className="text-gray-400 hover:text-gray-600">
          <Image
            src={DotsSVG}
            alt="Pokémon"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <Link href={`/${pokemon.name}`}>{pokemon.name}</Link>
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
