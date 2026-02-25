import * as React from 'react';
import cn from '@/ui/utils/cn';
import PaginationContent from './PaginationContent';
import PaginationEllipsis from './PaginationEllipsis';
import PaginationItem from './PaginationItem';
import PaginationLink from './PaginationLink';
import PaginationNext from './PaginationNext';
import PaginationPrevious from './PaginationPrevious';

import $ from './pagination.module.scss';

type ItemProps = {
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
};

const Item: React.FC<ItemProps> = ({ page, isActive, onClick }) => (
  <PaginationItem key={page}>
    <PaginationLink
      onClick={() => onClick(page)}
      isActive={isActive}
      href="#"
      label={`Page ${page}`}
    >
      {page}
    </PaginationLink>
  </PaginationItem>
);

type GenerateItemsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  firstLastPageCount: number;
  centerPageCount: number;
};

const generateItems = ({
  currentPage,
  totalPages,
  onPageChange,
  firstLastPageCount,
  centerPageCount,
}: GenerateItemsProps): React.ReactElement[] => {
  // For small number of pages, show all
  if (totalPages <= firstLastPageCount * 2 + centerPageCount) {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
      <Item
        key={page}
        page={page}
        isActive={page === currentPage}
        onClick={onPageChange}
      />
    ));
  }

  const items: React.ReactElement[] = [];

  // First pages
  const firstPages = Array.from(
    { length: firstLastPageCount },
    (_, i) => i + 1,
  ).map(page => (
    <Item
      key={page}
      page={page}
      isActive={page === currentPage}
      onClick={onPageChange}
    />
  ));

  // Last pages
  const lastPages = Array.from(
    { length: firstLastPageCount },
    (_, i) => totalPages - firstLastPageCount + 1 + i,
  ).map(page => (
    <Item
      key={page}
      page={page}
      isActive={page === currentPage}
      onClick={onPageChange}
    />
  ));

  // Current page and surrounding pages
  const startCenter = Math.max(
    currentPage - Math.floor(centerPageCount / 2),
    firstLastPageCount + 1,
  );
  const endCenter = Math.min(
    currentPage + Math.floor(centerPageCount / 2),
    totalPages - firstLastPageCount,
  );

  const centerPages = Array.from(
    { length: endCenter - startCenter + 1 },
    (_, i) => startCenter + i,
  ).map(page => (
    <Item
      key={page}
      page={page}
      isActive={page === currentPage}
      onClick={onPageChange}
    />
  ));

  // Assemble the pagination elements
  items.push(...firstPages);

  if (startCenter > firstLastPageCount + 1) {
    items.push(<PaginationEllipsis key="pagination-ellipsis-1" />);
  }

  items.push(...centerPages);

  if (endCenter < totalPages - firstLastPageCount) {
    items.push(<PaginationEllipsis key="pagination-ellipsis-2" />);
  }

  items.push(...lastPages);

  return items;
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  firstLastPageCount?: number;
  centerPageCount?: number;
  className?: string;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  firstLastPageCount = 2,
  centerPageCount = 1,
  className,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    onPageChange(validPage);
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn($.pagination, className)}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            label="Previous"
            href="#"
          />
        </PaginationItem>
        {generateItems({
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
          firstLastPageCount,
          centerPageCount,
        })}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            href="#"
            label="Next"
          />
        </PaginationItem>
      </PaginationContent>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
