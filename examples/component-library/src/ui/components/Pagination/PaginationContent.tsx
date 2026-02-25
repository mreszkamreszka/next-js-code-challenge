import * as React from 'react';
import cn from '@/ui/utils/cn';

import $ from './pagination.module.scss';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn($.content, className)} {...props} />
));
PaginationContent.displayName = 'PaginationContent';

export default PaginationContent;
