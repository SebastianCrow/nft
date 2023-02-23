import { useEffect } from 'react';
import { usePrevious } from '../../../shared';

interface UseResetPageOnSearchQueryChangeParams {
  searchQuery: string;
  onReset: () => void;
}

/**
 * Reset page by calling {@param onReset} on {@param searchQuery} change.
 * It doesn't call {@param onReset} on mount, just on update.
 */
export const useResetPageOnSearchQueryChange = ({
  searchQuery,
  onReset,
}: UseResetPageOnSearchQueryChangeParams): void => {
  const prevSearchQuery = usePrevious(searchQuery);
  useEffect(() => {
    if (prevSearchQuery !== undefined && prevSearchQuery !== searchQuery) {
      onReset();
    }
  }, [onReset, prevSearchQuery, searchQuery]);
};
