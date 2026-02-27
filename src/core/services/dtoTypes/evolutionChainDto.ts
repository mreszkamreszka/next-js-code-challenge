export type EvolutionChainSpeciesDTO = {
  name: string;
  url: string;
};

export type EvolutionChainLinkDTO = {
  evolution_details: unknown[];
  evolves_to: EvolutionChainLinkDTO[];
  is_baby: boolean;
  species: EvolutionChainSpeciesDTO;
};

export type EvolutionChainDTO = {
  id: number;
  chain: EvolutionChainLinkDTO;
};
