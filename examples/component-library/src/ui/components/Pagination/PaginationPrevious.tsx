import { ChevronLeftIcon } from 'lucide-react';
import * as React from 'react';
import cn from '@/ui/utils/cn';
import PaginationLink from './PaginationLink';

import $ from './pagination.module.scss';

const PaginationPrevious = ({
  className,
  label,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label={label}
    className={cn($.chevronLeft, className)}
    {...props}
  >
    <ChevronLeftIcon aria-hidden className="size-4" />
    <span>{label}</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

export default PaginationPrevious;
