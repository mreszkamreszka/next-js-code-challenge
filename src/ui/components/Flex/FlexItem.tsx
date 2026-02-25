import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const FlexItemVariants = cva('min-w-0 flex-initial', {
  variants: {
    self: {
      start: 'self-start',
      end: 'self-end',
      center: 'self-center',
      stretch: 'self-stretch',
      baseline: 'self-baseline',
    },
    flex: {
      auto: 'flex-auto',
      none: 'flex-none',
      initial: 'flex-initial',
      equal: 'flex-1',
    },
    basis: {
      1: 'basis-1/12',
      2: 'basis-2/12',
      3: 'basis-3/12',
      4: 'basis-4/12',
      5: 'basis-5/12',
      6: 'basis-6/12',
      7: 'basis-7/12',
      8: 'basis-8/12',
      9: 'basis-9/12',
      10: 'basis-10/12',
      11: 'basis-11/12',
      12: 'basis-full',
    },
    fullHeight: {
      true: 'min-h-full',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {},
});

type FlexItemProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof FlexItemVariants> & {
    asChild?: boolean;
  };

const FlexItem = React.forwardRef<HTMLDivElement, FlexItemProps>(
  (
    {
      self,
      asChild,
      basis,
      children,
      className,
      flex,
      fullHeight,
      fullWidth,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={FlexItemVariants({
          self,
          flex,
          basis,
          fullHeight,
          fullWidth,
          className,
        })}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

FlexItem.displayName = 'FlexItem';

export default FlexItem;
