import type { Pokemon } from '@/core/models/pokemon';
import type { PokemonDTO } from '@/core/services/dtoTypes/pokemonDto';
import { transformPokemon } from '@/core/services/transformers/pokemonTransformer';
import api from './apiService';

async function getPokemon(name: string): Promise<Pokemon> {
  const response = await api.get<PokemonDTO>(`/pokemon/${name}`);
  return transformPokemon(response.data);
}

export default getPokemon;
