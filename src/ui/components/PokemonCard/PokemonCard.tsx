'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import DotsSVG from '@/public/assets/dots.svg';
import PokemonCardMenu from '@/ui/components/PokemonCard/PokemonCardMenu/PokemonCardMenu';
import PokemonDetailDialog from '@/ui/components/PokemonDetailDialog/PokemonDetailDialog';
import usePokemon from '@/ui/hooks/services/usePokemon';

type PokemonCardProps = {
  pokemonName: string;
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemonName }) => {
  const t = useTranslations('PokemonCard');
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
    <div className="rounded-sm bg-white shadow-md transition hover:shadow-xl dark:bg-slate-800 dark:shadow-slate-900/50 dark:hover:shadow-slate-800">
      {/* Top section */}
      <button
        className="relative flex h-56 w-full cursor-pointer items-center justify-center bg-[#F6F6FF] dark:bg-slate-700/50"
        aria-label={t('ariaViewDetails', { name: pokemon.name })}
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
          <div
            aria-hidden
            className="h-36 bg-gray-200 object-contain dark:bg-slate-600"
          />
        )}
      </button>

      {/* Bottom section */}
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className="truncate font-semibold text-slate-800 capitalize dark:text-slate-200">
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
