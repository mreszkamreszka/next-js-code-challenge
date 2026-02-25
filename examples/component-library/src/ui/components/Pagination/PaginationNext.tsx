import { ChevronRightIcon } from 'lucide-react';
import * as React from 'react';
import cn from '@/ui/utils/cn';
import PaginationLink from './PaginationLink';

import $ from './pagination.module.scss';

const PaginationNext = ({
  className,
  label,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label={label}
    className={cn($.chevronRight, className)}
    {...props}
  >
    <span>{label}</span>
    <ChevronRightIcon aria-hidden className="size-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

export default PaginationNext;
