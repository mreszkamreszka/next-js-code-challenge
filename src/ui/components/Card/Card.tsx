import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import cn from '@/ui/utils/cn';

const cardVariants = cva('flex flex-col overflow-hidden', {
  variants: {
    variant: {
      outline: 'border bg-background',
    },
    radius: {
      sm: 'rounded-xs',
      md: 'rounded-md',
      lg: 'rounded-lg',
      none: undefined,
    },
  },
  defaultVariants: {
    radius: 'md',
  },
});

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, radius, ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants({
        variant,
        radius,
        className,
      })}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('px-2 pt-2 pb-0', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-2', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-wrap gap-1 px-2 pb-2', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardFooter, CardHeader };
