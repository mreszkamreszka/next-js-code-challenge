'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { Pokemon } from '@/core/models/pokemon';
import usePokemon from '@/ui/hooks/services/usePokemon';
import usePokemonEvolutionChain from '@/ui/hooks/services/usePokemonEvolutionChain';
import cn from '@/ui/utils/cn';

const TYPE_COLORS: Record<string, { bg: string; dot: string }> = {
  grass: { bg: 'bg-green-100', dot: 'bg-green-600' },
  poison: { bg: 'bg-purple-100', dot: 'bg-purple-600' },
  fire: { bg: 'bg-red-100', dot: 'bg-red-600' },
  water: { bg: 'bg-blue-100', dot: 'bg-blue-600' },
  electric: { bg: 'bg-yellow-100', dot: 'bg-yellow-600' },
  flying: { bg: 'bg-sky-100', dot: 'bg-sky-600' },
  bug: { bg: 'bg-lime-100', dot: 'bg-lime-600' },
  normal: { bg: 'bg-gray-100', dot: 'bg-gray-600' },
  ground: { bg: 'bg-amber-100', dot: 'bg-amber-600' },
  fairy: { bg: 'bg-pink-100', dot: 'bg-pink-600' },
  fighting: { bg: 'bg-orange-100', dot: 'bg-orange-600' },
  psychic: { bg: 'bg-fuchsia-100', dot: 'bg-fuchsia-600' },
  rock: { bg: 'bg-stone-200', dot: 'bg-stone-600' },
  ice: { bg: 'bg-cyan-100', dot: 'bg-cyan-600' },
  ghost: { bg: 'bg-violet-100', dot: 'bg-violet-600' },
  dragon: { bg: 'bg-indigo-100', dot: 'bg-indigo-600' },
  dark: { bg: 'bg-slate-200', dot: 'bg-slate-600' },
  steel: { bg: 'bg-slate-100', dot: 'bg-slate-500' },
};

const DEFAULT_TYPE_COLOR = { bg: 'bg-slate-100', dot: 'bg-slate-600' };

function getTypeStyle(type: string) {
  return TYPE_COLORS[type.toLowerCase()] ?? DEFAULT_TYPE_COLOR;
}

const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

type TabId = 'about' | 'stats' | 'evolution';

type PokemonDetailDialogProps = {
  pokemonName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function AboutTab({ pokemon }: { pokemon: Pokemon }) {
  const t = useTranslations('PokemonDetailDialog');
  const weightKg = (pokemon.weight / 10).toFixed(1).replace('.', ',');
  const heightM = (pokemon.height / 10).toFixed(1).replace('.', ',');
  const abilities = pokemon.abilities.map(a => a.name).join(', ');

  const rows = [
    { label: t('name'), value: pokemon.name },
    { label: t('id'), value: String(pokemon.id).padStart(3, '0') },
    { label: t('baseExperience'), value: `${pokemon.baseExperience} XP` },
    { label: t('weight'), value: `${weightKg} kg` },
    { label: t('height'), value: `${heightM} m` },
    { label: t('types'), value: pokemon.types.join(', ') },
    { label: t('abilities'), value: abilities },
  ];

  return (
    <div className="space-y-3">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex justify-between gap-4">
          <span className="font-semibold text-slate-800">{label}</span>
          <span className="text-slate-600 capitalize">{value}</span>
        </div>
      ))}
    </div>
  );
}

function StatsTab({ pokemon }: { pokemon: Pokemon }) {
  const maxStat = Math.max(...pokemon.stats.map(s => s.baseStat), 255);

  return (
    <div className="space-y-4">
      {pokemon.stats.map(stat => (
        <div key={stat.name}>
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-medium text-slate-800 capitalize">
              {STAT_NAMES[stat.name] ?? stat.name}
            </span>
            <span className="text-slate-600">{stat.baseStat}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-violet-600 transition-all"
              style={{ width: `${(stat.baseStat / maxStat) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function EvolutionTab({ pokemonId }: { pokemonId: number }) {
  const t = useTranslations('PokemonDetailDialog');
  const { chain, loading, notFound } = usePokemonEvolutionChain(pokemonId);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-slate-500">{t('loading')}</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-slate-500">
        <p>{t('evolutionSpeciesNotFound')}</p>
      </div>
    );
  }

  if (chain.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-slate-500">
        <p>{t('evolutionPlaceholder')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      {chain.map((item, index) => (
        <div key={item.id} className="flex flex-col items-stretch">
          <div className="flex items-center gap-4 rounded-lg bg-slate-50 p-4">
            <Image
              unoptimized
              src={item.spriteUrl}
              alt={item.name}
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="rounded bg-slate-200 px-2 py-0.5 text-sm font-medium text-slate-700">
              {String(item.id).padStart(3, '0')}
            </span>
            <span className="font-semibold text-slate-800 capitalize">
              {item.name}
            </span>
          </div>
          {index < chain.length - 1 && (
            <div className="ml-6 h-6 border-l-2 border-dashed border-slate-300" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function PokemonDetailDialog({
  pokemonName,
  open,
  onOpenChange,
}: PokemonDetailDialogProps) {
  const t = useTranslations('PokemonDetailDialog');
  const [activeTab, setActiveTab] = useState<TabId>('about');
  const { pokemon, loading } = usePokemon(
    open && pokemonName ? pokemonName : '',
  );

  const tabs: { id: TabId; label: string }[] = [
    { id: 'about', label: t('about') },
    { id: 'stats', label: t('stats') },
    { id: 'evolution', label: t('evolution') },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-xl">
          <Dialog.Title className="sr-only">
            {pokemonName ? `${t('about')} ${pokemonName}` : t('loading')}
          </Dialog.Title>
          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute top-4 right-4 rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label={t('close')}
            >
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>

          {loading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-slate-500">{t('loading')}</p>
            </div>
          ) : pokemon ? (
            <div className="flex">
              {/* Left panel */}
              <div className="flex w-64 flex-col border-r border-slate-200 bg-[#F6F6FF] p-6">
                <span className="text-sm text-slate-500">
                  {String(pokemon.id).padStart(3, '0')}
                </span>
                <h2 className="mb-3 text-2xl font-bold text-violet-900 capitalize">
                  {pokemon.name}
                </h2>
                <div className="mb-6 flex flex-wrap gap-2">
                  {pokemon.types.map(type => {
                    const style = getTypeStyle(type);
                    return (
                      <span
                        key={type}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium capitalize',
                          style.bg,
                          'text-slate-800',
                        )}
                      >
                        <span
                          className={cn('h-2 w-2 rounded-full', style.dot)}
                        />
                        {type}
                      </span>
                    );
                  })}
                </div>
                {pokemon.sprites.frontDefault && (
                  <div className="mt-auto flex justify-center">
                    <Image
                      src={pokemon.sprites.frontDefault}
                      alt={pokemon.name}
                      width={160}
                      height={160}
                      className="h-40 w-40 object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Right panel */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-6 flex gap-6 border-b border-slate-200">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      className={cn(
                        'border-b-2 pb-2 font-medium transition-colors',
                        activeTab === tab.id
                          ? 'border-violet-600 text-violet-900'
                          : 'border-transparent text-slate-500 hover:text-slate-700',
                      )}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="min-h-[200px]">
                  {activeTab === 'about' && <AboutTab pokemon={pokemon} />}
                  {activeTab === 'stats' && <StatsTab pokemon={pokemon} />}
                  {activeTab === 'evolution' && (
                    <EvolutionTab pokemonId={pokemon.id} />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-slate-500">{t('notFound')}</p>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
