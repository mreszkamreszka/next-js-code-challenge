import { MoreHorizontalIcon } from 'lucide-react';
import * as React from 'react';
import cn from '@/ui/utils/cn';

import $ from './pagination.module.scss';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn($.ellipsis, className)} {...props}>
    <MoreHorizontalIcon className="size-4" />
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export default PaginationEllipsis;
