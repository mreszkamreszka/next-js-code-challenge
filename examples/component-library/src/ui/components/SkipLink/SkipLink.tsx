import * as React from 'react';
import cn from '@/ui/utils/cn';

import $ from './skip-link.module.scss';

type SkipLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

const SkipLink = React.forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ className, children, ...props }, ref) => (
    <a className={cn($.skipLink, className)} ref={ref} {...props}>
      {children}
    </a>
  ),
);

SkipLink.displayName = 'SkipLink';

export default SkipLink;
