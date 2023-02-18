import { ListingsItem } from './useFetchListings';
import { useMemo } from 'react';

interface UseFilterListingsParams {
  items: ListingsItem[];
  searchQuery?: string;
}

export const useFilterListings = ({
  items,
  searchQuery,
}: UseFilterListingsParams) => {
  return useMemo(
    () =>
      !searchQuery
        ? items
        : items.filter(
            ({ name }) =>
              name
                .toLocaleLowerCase()
                .includes(searchQuery?.toLocaleLowerCase()) // TODO: Correct place?
          ),
    [items, searchQuery]
  );
};
