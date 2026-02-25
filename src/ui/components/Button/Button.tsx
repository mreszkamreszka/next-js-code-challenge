import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import cn from '@/ui/utils/cn';

const buttonVariants = cva(
  'items-center justify-center gap-2 text-sm font-medium whitespace-nowrap no-underline transition-colors focus-visible:outline active:scale-95 disabled:pointer-events-none disabled:opacity-50 motion-safe:transition [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'hover:bg-primary hover:opacity-90',
        outline:
          'bg-transparent text-primary shadow-[inset_0_0_0_2px_var(--tc-text-primary)] hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-blue-300 text-secondary-foreground shadow-xs hover:bg-blue-500',
        ghost: 'bg-transparent text-primary hover:underline',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'rounded-md',
        sm: 'rounded-pill text-xs',
        lg: 'rounded-pill text-lg',
        icon: 'size-14 p-4',
        smallicon: 'size-11 p-3',
      },
      fullwidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullwidth: false,
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    testid?: string;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      fullwidth = false,
      asChild = false,
      testid,
      type = 'button',
      size,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullwidth, className }))}
        type={type}
        data-testid={testid}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export default Button;
