'use client';

import { ExternalLink, Heart, HeartOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useFavorites } from '@/ui/contexts/FavoritesContext';
import cn from '@/ui/utils/cn';

type PokemonCardMenuProps = {
  pokemonName: string;
  onOpenDetail?: () => void;
  trigger: React.ReactNode;
  className?: string;
};

const PokemonCardMenu: React.FC<PokemonCardMenuProps> = ({
  pokemonName,
  onOpenDetail,
  trigger,
  className,
}) => {
  const t = useTranslations('PokemonCardMenu');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(pokemonName);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className={cn('relative', className)}>
      <button
        type="button"
        className="cursor-pointer p-2 text-gray-400 hover:text-gray-600"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={t('ariaOpenMenu', { name: pokemonName })}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 z-10 mt-1 min-w-[180px] rounded-md bg-white p-2 shadow-lg ring-1 ring-black/5"
          role="menu"
        >
          <button
            type="button"
            role="menuitem"
            aria-label={t('ariaOpenDetail', { name: pokemonName })}
            className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-slate-800 hover:bg-slate-50"
            onClick={() => {
              setIsOpen(false);
              onOpenDetail?.();
            }}
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            {t('openPokemon')}
          </button>
          <button
            type="button"
            role="menuitem"
            aria-label={
              favorite
                ? `Remove ${pokemonName} from favorites`
                : `Add ${pokemonName} to favorites`
            }
            className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-slate-800 hover:bg-slate-50"
            onClick={() => {
              if (favorite) {
                removeFavorite(pokemonName);
              } else {
                addFavorite(pokemonName);
              }
              setIsOpen(false);
            }}
          >
            {favorite ? (
              <>
                <HeartOff className="h-4 w-4 shrink-0" />
                {t('removeFromFavorites')}
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 shrink-0" />
                {t('addToFavorites')}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonCardMenu;
