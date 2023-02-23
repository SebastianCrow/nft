import { useEffect } from 'react';
import type { Optional } from '../../../shared';

export interface UseFetchNextPageParams {
  prevPage: Optional<number>;
  page: number;
  onPageUpdate: (page: number) => void;
}

/**
 * Call {@param onPageUpdate} when page is updated: {@param page} different than {@param prevPage}.
 * It doesn't call {@param onPageUpdate} on mount, just on page update.
 */
export const useOnNextPageUpdate = ({
  prevPage,
  page,
  onPageUpdate,
}: UseFetchNextPageParams): void => {
  useEffect(() => {
    if (page < 1) {
      throw new Error(`Page ${page} is lower than 1`);
    }
    if (prevPage && page > prevPage) {
      onPageUpdate(page);
    }
  }, [onPageUpdate, page, prevPage]);
};
