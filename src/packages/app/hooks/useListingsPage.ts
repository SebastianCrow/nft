import { useCallback, useMemo, useState } from 'react';
import { useFetchItemsOnPageChange } from './useFetchItemsOnPageChange';
import { useResetPageOnSearchQueryChange } from './useResetPageOnSearchQueryChange';

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

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  useResetPageOnSearchQueryChange({
    searchQuery,
    onReset: resetPage,
  });

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
