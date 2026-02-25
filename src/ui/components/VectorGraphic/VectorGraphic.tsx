import type { VariantProps } from 'class-variance-authority';
import type { FC } from 'react';
// Illustration imports
import { cva } from 'class-variance-authority';
// Tailwind styles for the vector
import cn from '@/ui/utils/cn'; // Assuming you have a utility for merging class names
// Icon imports
import IconClose from './icons/close.svg';
import IllustrationLogo from './illustrations/logo.svg';
import PokemonLogo from './illustrations/pokemonlogo.svg';

// Icons
const icons = {
  'icon-close': IconClose,
};

// Illustrations
const illustrations = {
  'illustration-logo': IllustrationLogo,
  'pokemon-logo': PokemonLogo,
};

export type IconName = keyof typeof icons;
type IllustrationName = keyof typeof illustrations;
export type VectorName = IconName | IllustrationName;

const vectorVariants = cva('inline-block', {
  variants: {
    size: {
      full: 'h-full w-full',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type Props = {
  name: VectorName;
  className?: string;
} & VariantProps<typeof vectorVariants>;
const VectorGraphic: FC<Props> = ({ name, className, size }) => {
  const Vector = { ...icons, ...illustrations }[name];
  return <Vector className={cn(vectorVariants({ size }), className)} />;
};

export default VectorGraphic;
