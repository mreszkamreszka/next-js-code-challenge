import type { EvolutionChainDTO } from '@/core/services/dtoTypes/evolutionChainDto';
import api from './apiService';

export type EvolutionChainItem = {
  id: number;
  name: string;
  spriteUrl: string;
};

function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : 0;
}

function flattenChain(chain: EvolutionChainDTO['chain']): EvolutionChainItem[] {
  const result: EvolutionChainItem[] = [];
  const SPRITE_BASE =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  function traverse(link: EvolutionChainDTO['chain']) {
    const id = extractIdFromUrl(link.species.url);
    result.push({
      id,
      name: link.species.name,
      spriteUrl: `${SPRITE_BASE}/${id}.png`,
    });
    for (const evolution of link.evolves_to) {
      traverse(evolution);
    }
  }

  traverse(chain);
  return result;
}

export async function getPokemonChain(
  chainId: number,
): Promise<EvolutionChainItem[]> {
  const response = await api.get<EvolutionChainDTO>(
    `/evolution-chain/${chainId}/`,
  );

  return flattenChain(response.data.chain);
}

export type EvolutionChainIdResult =
  | { ok: true; chainId: number }
  | { ok: false; notFound: true }
  | { ok: false };

export async function getEvolutionChainId(
  pokemonId: number,
): Promise<EvolutionChainIdResult> {
  const response = await api.get<{ evolution_chain?: { url: string } }>(
    `/pokemon-species/${pokemonId}/`,
  );

  if (response.status === 404) {
    return { ok: false, notFound: true };
  }

  const url = response.data.evolution_chain?.url;
  if (!url) return { ok: false };

  const match = url.match(/evolution-chain\/(\d+)\/?$/);
  const chainId = match ? parseInt(match[1], 10) : null;
  return chainId != null ? { ok: true, chainId } : { ok: false };
}
