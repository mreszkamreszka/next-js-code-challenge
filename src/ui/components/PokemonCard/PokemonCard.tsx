'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DotsSVG from '@/public/assets/dots.svg';
import PokemonCardMenu from '@/ui/components/PokemonCard/PokemonCardMenu/PokemonCardMenu';
import PokemonDetailDialog from '@/ui/components/PokemonDetailDialog/PokemonDetailDialog';
import usePokemon from '@/ui/hooks/services/usePokemon';

type PokemonCardProps = {
  pokemonName: string;
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemonName }) => {
  const { pokemon } = usePokemon(pokemonName);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateUrl = (name: string | null) => {
    if (typeof window === 'undefined') return;
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const locale = pathParts[0] ?? 'en';
    const newPath = name ? `/${locale}/${name}` : `/${locale}`;
    window.history.pushState({}, '', newPath);
  };

  const openDetail = () => {
    updateUrl(pokemon!.name);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (!isDialogOpen) return undefined;
    const handlePopState = () => setIsDialogOpen(false);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isDialogOpen]);

  if (!pokemon) {
    return null;
  }

  return (
    <div className="rounded-sm bg-white shadow-md transition hover:shadow-xl">
      {/* Top section */}
      <button
        className="relative flex h-56 cursor-pointer items-center justify-center bg-[#F6F6FF]"
        onClick={openDetail}
        onKeyDown={e => e.key === 'Enter' && openDetail()}
      >
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
      </button>

      {/* Bottom section */}
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className="truncate font-semibold text-slate-800 capitalize">
          {pokemon.name}
        </h2>

        <div>
          <PokemonCardMenu
            pokemonName={pokemon.name}
            trigger={
              <Image
                src={DotsSVG}
                alt="Menu"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            }
            onOpenDetail={openDetail}
          />
        </div>
      </div>

      <PokemonDetailDialog
        pokemonName={pokemon.name}
        open={isDialogOpen}
        onOpenChange={open => {
          setIsDialogOpen(open);
          if (!open) window.history.back();
        }}
      />
    </div>
  );
};

export default PokemonCard;
