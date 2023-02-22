import { useCallback, useMemo, useState } from 'react';
import { usePrevious } from '../../../shared';
import { useOnNextPageUpdate } from './useOnNextPageUpdate';
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

  const prevPage = usePrevious(page);
  useOnNextPageUpdate({
    prevPage,
    page,
    onPageUpdate: fetchNext,
  });

  return useMemo(
    () => ({
      page,
      goToPage: setPage,
    }),
    [page]
  );
};
