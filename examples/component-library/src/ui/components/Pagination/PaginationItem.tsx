import * as React from 'react';
import cn from '@/ui/utils/cn';

import $ from './pagination.module.scss';

export type PaginationItemProps = React.ComponentProps<'li'>;

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn($.item, className)} {...props} />
  ),
);
PaginationItem.displayName = 'PaginationItem';

export default PaginationItem;
