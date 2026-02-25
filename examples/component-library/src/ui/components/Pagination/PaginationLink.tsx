import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Link } from '@/core/navigation/navigation';
import cn from '@/ui/utils/cn';

import $ from './pagination.module.scss';

const PaginationLinkVariants = cva($.link, {
  variants: {
    variant: {
      default: $.default,
      active: $.active,
      disabled: $.disabled,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
  label?: string;
} & VariantProps<typeof PaginationLinkVariants> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  isActive,
  disabled = false,
  label,
  ...props
}: PaginationLinkProps) => {
  const variant = isActive ? 'active' : disabled ? 'disabled' : 'default';
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(PaginationLinkVariants({ variant }), className)}
      aria-disabled={disabled}
      aria-label={label}
      {...props}
    />
  );
};
PaginationLink.displayName = 'PaginationLink';

export default PaginationLink;
