import { useEffect, useMemo, useState } from 'react';
import { useFetchItemsOnPageChange } from './useFetchItemsOnPageChange';

interface UseListingsPageParams {
  searchQuery: string;
  fetchNext: () => void;
}

interface UseListingsPageReturn {
  page: number;
  goToPage: (page: number) => void;
}

export const useListingsPage = ({
  searchQuery,
  fetchNext,
}: UseListingsPageParams): UseListingsPageReturn => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useFetchItemsOnPageChange({
    page,
    fetchNext,
  });

  return useMemo(
    () => ({
      page,
      goToPage: setPage,
    }),
    [page]
  );
};
