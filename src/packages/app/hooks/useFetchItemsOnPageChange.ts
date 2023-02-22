import { useEffect } from 'react';
import { usePrevious } from '../../../shared';

interface UseFetchNextPageParams {
  page: number;
  fetchNext: () => void;
}
export const useFetchItemsOnPageChange = ({
  page,
  fetchNext,
}: UseFetchNextPageParams): void => {
  const prevPage = usePrevious(page);
  useEffect(() => {
    if (page < 1) {
      throw new Error(`Page ${page} is lower than 1`);
    }
    if (prevPage && page > prevPage) {
      fetchNext();
    }
  }, [fetchNext, page, prevPage]);
};
