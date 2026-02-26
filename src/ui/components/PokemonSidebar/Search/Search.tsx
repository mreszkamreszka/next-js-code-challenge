'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SearchSVG from '@/public/assets/search.svg';
import { usePokemonSearch } from '@/ui/contexts/PokemonSearchContext';

const Search = () => {
  const t = useTranslations('Sidebar');
  const { searchTerm, setSearchTerm } = usePokemonSearch();

  return (
    <div className="relative mb-8">
      <Image
        src={SearchSVG}
        alt="Search"
        width={20}
        height={20}
        className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
      />
      <input
        type="text"
        placeholder={t('search')}
        className="w-full rounded-xl bg-slate-100 py-3 pr-4 pl-12 focus:ring-2 focus:ring-violet-500 focus:outline-none"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
    </div>
  );
};

export default Search;
