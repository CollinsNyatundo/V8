import { useState, useEffect } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

export const usePagination = <T>({
  items,
  itemsPerPage = 9,
  initialPage = 1,
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    // Reset to first page when items change
    setCurrentPage(1);
  }, [items.length]);

  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
  };
};