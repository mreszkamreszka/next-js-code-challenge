import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import type { VectorName } from '@/components/VectorGraphic/VectorGraphic';
import VectorGraphic from '@/components/VectorGraphic/VectorGraphic';
import cn from '@/ui/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-medium whitespace-nowrap outline-[0.125rem] outline-offset-[0.125rem] transition-colors focus-visible:outline active:scale-95 disabled:pointer-events-none disabled:opacity-50 motion-safe:transition',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:opacity-90',
        outline:
          'bg-transparent text-primary shadow-[inset_0_0_0_2px_var(--tc-text-primary)] hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-blue-300 text-secondary-foreground shadow-xs hover:bg-blue-500',
        ghost: 'bg-transparent text-primary hover:underline',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'text-base',
        sm: 'text-xs',
        lg: 'text-lg',
      },
      iconPosition: {
        left: 'flex-row',
        right: 'flex-row-reverse',
        top: 'flex-col items-center',
        bottom: 'flex-col-reverse items-center',
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

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon: VectorName;
    iconSize: 'sm' | 'md' | 'lg';
    ariaLabel?: string;
    asChild?: boolean;
    testid?: string;
    fullWidth?: boolean;
  };

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size,
      icon,
      iconPosition,
      iconSize,
      variant = 'default',
      className,
      fullwidth = false,
      asChild = false,
      testid,
      type = 'button',
      children,
      ariaLabel,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullwidth,
            className,
            iconPosition,
          }),
        )}
        type={type}
        data-testid={testid}
        aria-label={ariaLabel}
        {...props}
      >
        <VectorGraphic name={icon} size={iconSize} />
        {children}
      </Comp>
    );
  },
);
IconButton.displayName = 'IconButton';

export default IconButton;
