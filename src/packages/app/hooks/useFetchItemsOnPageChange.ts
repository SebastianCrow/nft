import { useEffect } from 'react';
import type { Optional } from '../../../shared';

export interface UseFetchNextPageParams {
  prevPage: Optional<number>;
  page: number;
  fetchNext: (page: number) => void;
}
export const useFetchItemsOnPageChange = ({
  prevPage,
  page,
  fetchNext,
}: UseFetchNextPageParams): void => {
  useEffect(() => {
    if (page < 1) {
      throw new Error(`Page ${page} is lower than 1`);
    }
    if (prevPage && page > prevPage) {
      fetchNext(page);
    }
  }, [fetchNext, page, prevPage]);
};
