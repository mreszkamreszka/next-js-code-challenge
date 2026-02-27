'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import SearchSVG from '@/public/assets/search.svg';
import { useSearch } from '@/ui/contexts/SearchContext';

const DEBOUNCE_MS = 300;

const Search = () => {
  const t = useTranslations('Sidebar');
  const { searchTerm, setSearchTerm } = useSearch();
  const [inputValue, setInputValue] = useState(searchTerm);
  const [debouncedInput, setDebouncedInput] = useState(searchTerm);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedInput(inputValue), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [inputValue]);

  useEffect(() => {
    setSearchTerm(debouncedInput);
  }, [debouncedInput, setSearchTerm]);

  return (
    <div className="relative mb-8" role="search">
      <Image
        aria-hidden
        src={SearchSVG}
        alt=""
        width={20}
        height={20}
        className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
      />
      <input
        type="search"
        placeholder={t('search')}
        aria-label={t('ariaSearchLabel')}
        className="w-full rounded-xl bg-slate-100 py-3 pr-4 pl-12 focus:ring-2 focus:ring-violet-500 focus:outline-none"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
    </div>
  );
};

export default Search;
