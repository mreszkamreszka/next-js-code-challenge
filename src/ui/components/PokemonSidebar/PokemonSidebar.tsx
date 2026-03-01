'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Navigation from '@/ui/components/PokemonSidebar/Navigation/Navigation';
import Search from '@/ui/components/PokemonSidebar/Search/Search';

type PokemonSidebarProps = {
  onNavigate?: () => void;
};

const PokemonSidebar: FC<PokemonSidebarProps> = ({ onNavigate }) => {
  const t = useTranslations('Sidebar');

  return (
    <aside
      className="sticky top-0 flex h-screen min-h-[540px] w-[320px] lg:shrink-0 xl:pt-6 xl:pb-6"
      aria-label={t('ariaSidebarLabel')}
    >
      <div className="flex flex-col justify-between bg-white shadow-lg xl:rounded-sm dark:bg-slate-800 dark:shadow-slate-900/50">
        <div className="border-b border-neutral-100 p-6 dark:border-slate-700">
          <div className="mb-10">
            <Image
              priority
              src="/assets/pokemonlogo.png"
              alt="Pokemon logo"
              width={170}
              height={62}
              className="mx-auto w-40"
            />
          </div>
          <Search />
        </div>

        <div className="h-full border-b border-neutral-100 p-6 dark:border-slate-700">
          <Navigation onNavigate={onNavigate} />
        </div>
        <footer className="p-6 text-xs text-gray-400 dark:text-slate-500">
          <p>{t('copyright')}</p>
          <p className="mt-2">{t('trademark')}</p>
        </footer>
      </div>
    </aside>
  );
};

export default PokemonSidebar;
