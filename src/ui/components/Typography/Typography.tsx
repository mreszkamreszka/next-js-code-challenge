import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'font-sans text-h1',
      h2: 'font-sans text-h2',
      h3: 'font-sans text-h3',
      h4: 'font-sans text-h4',
      body1: 'font-sans text-body-1',
      body2: 'font-sans text-body-2',
    },
    lineClamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
    },
    truncate: {
      true: 'truncate',
    },
    balance: {
      true: 'text-balance',
    },
  },
  defaultVariants: {
    variant: 'body1',
  },
});

export type TypographyVariantProps = VariantProps<typeof typographyVariants>;

type TypographyProps = React.HTMLAttributes<HTMLParagraphElement> &
  TypographyVariantProps & {
    asChild?: boolean;
  };

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    { className, asChild, variant, truncate, lineClamp, balance, ...props },
    ref,
  ) => {
    const variantMapping = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      body1: 'p',
      body2: 'p',
    } as const;

    const mappedComp = variant ? variantMapping[variant] : 'p';
    const Comp = asChild ? Slot : mappedComp;

    return (
      <Comp
        ref={ref}
        className={typographyVariants({
          variant,
          truncate,
          lineClamp,
          balance,
          className,
        })}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';

export default Typography;
