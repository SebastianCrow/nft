import { useCallback, useMemo, useState } from 'react';

interface UseListingsPageReturn {
  page: number;
  goToPage: (page: number) => void;
  resetToFirstPage: () => void;
}

export const useListingsPage = (): UseListingsPageReturn => {
  const [page, setPage] = useState(1);

  const resetToFirstPage = useCallback(() => {
    setPage(1);
  }, []);

  return useMemo(
    () => ({
      page,
      goToPage: setPage,
      resetToFirstPage,
    }),
    [page, resetToFirstPage]
  );
};
