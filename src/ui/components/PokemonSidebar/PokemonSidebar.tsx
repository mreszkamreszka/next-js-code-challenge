'use client';
import type { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Navigation from '@/ui/components/PokemonSidebar/Navigation/Navigation';
import Search from '@/ui/components/PokemonSidebar/Search/Search';

const PokemonSidebar: FC = () => {
  const t = useTranslations('Sidebar');

  return (
    <aside className="sticky top-0 flex h-screen min-h-[540px] w-[320px] pt-6 pb-6 lg:shrink-0">
      <div className="flex flex-col justify-between rounded-sm bg-white shadow-lg">
        <div className="border-b-1 border-neutral-100 p-6">
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

        <div className="h-full border-b-1 border-neutral-100 p-6">
          <Navigation />
        </div>
        <footer className="p-6 text-xs text-gray-400">
          <p>{t('copyright')}</p>
          <p className="mt-2">{t('trademark')}</p>
        </footer>
      </div>
    </aside>
  );
};

export default PokemonSidebar;
