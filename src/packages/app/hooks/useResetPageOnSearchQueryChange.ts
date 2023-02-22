import { useEffect } from 'react';
import { usePrevious } from '../../../shared';

interface UseResetPageOnSearchQueryChangeParams {
  searchQuery: string;
  onReset: () => void;
}

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
