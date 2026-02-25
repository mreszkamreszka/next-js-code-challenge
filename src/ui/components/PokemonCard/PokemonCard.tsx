import type { FC } from 'react';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { Flex } from '@/components/Flex/Flex';
import usePokemon from '@/ui/hooks/services/usePokemon';
import { Card, CardContent, CardHeader } from '../Card/Card';
import Typography from '../Typography/Typography';

type PokemonCardProps = {
  pokemonName: string;
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemonName }) => {
  const { pokemon } = usePokemon(pokemonName);

  if (!pokemon) {
    return null;
  }

  return (
    <Button className="w-full">
      <Card variant="outline" className="border-none bg-background p-5 shadow">
        <CardHeader className="p-0">
          <Flex className="flex-row items-center justify-between gap-2">
            <Image
              src="/assets/pokemonlogo.png"
              alt="pokemonlogo"
              width={100}
              height={100}
            />
            <Typography>{pokemon.name}</Typography>
          </Flex>
        </CardHeader>
        <CardContent className="flex flex-col px-0 py-4">
          {pokemon.sprites.frontDefault ? (
            <Image
              src={pokemon.sprites.frontDefault}
              alt={pokemon.name}
              width={100}
              height={100}
            />
          ) : (
            // TODO: Add a placeholder image
            <div className="h-24 w-24 bg-gray-200" />
          )}
        </CardContent>
      </Card>
    </Button>
  );
};

export default PokemonCard;
