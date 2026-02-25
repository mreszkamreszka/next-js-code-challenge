import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import FlexItem from './FlexItem';

const FlexVariants = cva('flex', {
  variants: {
    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
    },
    gap: {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      xxl: 'gap-10',
    },
    direction: {
      col: 'flex-col',
      row: 'flex-row',
      'col-reverse': 'flex-col-reverse',
      'row-reverse': 'flex-row-reverse',
    },
    fullHeight: {
      true: 'min-h-full',
    },
    fullWidth: {
      true: 'w-full',
    },
    wrap: {
      true: 'flex-wrap',
    },
  },
  defaultVariants: {},
});

type FlexProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof FlexVariants> & {
    asChild?: boolean;
  };

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      align,
      asChild,
      className,
      direction,
      fullHeight,
      fullWidth,
      gap,
      justify,
      wrap,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={FlexVariants({
          align,
          justify,
          direction,
          gap,
          fullHeight,
          fullWidth,
          wrap,
          className,
        })}
        {...props}
      />
    );
  },
);

Flex.displayName = 'Flex';

export { Flex, FlexItem };
