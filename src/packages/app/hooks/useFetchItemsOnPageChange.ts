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
    if (!prevPage || page > prevPage) {
      fetchNext();
    }
  }, [fetchNext, page, prevPage]);
};
