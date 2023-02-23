import { useEffect, useMemo } from 'react';
import type {
  QueryFunction,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type {
  ListingsItem,
  ListingsPage,
} from '../services/listingsNetwork.service';
import {
  fetchListings,
  ITEMS_PER_PAGE,
} from '../services/listingsNetwork.service';

const LISTINGS_QUERY_KEY = 'listings';

const LISTINGS_RETRY_DELAY_MS = 500;

type FetchFilteredListingsType = (
  searchQuery?: string
) => QueryFunction<ListingsPage>;

/**
 * Fetch listings filtered by optional {@param searchQuery}.
 * Filtering is performed on the client side as a simple match of lower case search query in the item's name.
 */
const fetchFilteredListings: FetchFilteredListingsType =
  (searchQuery) =>
  async ({ pageParam = 1 }) => {
    const { items, nextPage } = await fetchListings(pageParam);

    const lowerCaseSearchQuery = searchQuery?.toLowerCase();

    const filteredItems = lowerCaseSearchQuery
      ? items.filter(({ title }: ListingsItem) =>
          title.toLowerCase().includes(lowerCaseSearchQuery)
        )
      : items;

    return {
      items: filteredItems,
      nextPage,
    };
  };

interface UseFetchListingsParams {
  searchQuery?: string;
}

interface UseFetchListingsReturn {
  items: ListingsItem[];
  fetchingFinished: boolean;
  fetchNext: () => void;
}

/**
 * Fetch listings filtered by an optional {@param searchQuery}.
 * Listings are fetched on demand and next pages can be requested if there is less than {@link ITEMS_PER_PAGE listings}.
 */
export const useFetchListings = ({
  searchQuery,
}: UseFetchListingsParams): UseFetchListingsReturn => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
  }: UseInfiniteQueryResult<ListingsPage> = useInfiniteQuery<ListingsPage>({
    queryKey: [LISTINGS_QUERY_KEY, searchQuery],
    queryFn: fetchFilteredListings(searchQuery),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: true,
    retryDelay: LISTINGS_RETRY_DELAY_MS,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const pages = data?.pages ?? [];
    const lastPageItems = pages[pages.length - 1]?.items;

    // Fetched too little items so page is not filled -> Fetch next page.
    // It happens when results are filtered with search query.
    if (lastPageItems && lastPageItems.length < ITEMS_PER_PAGE && hasNextPage) {
      fetchNextPage();
    }
  }, [data?.pages, fetchNextPage, hasNextPage]);

  // Return items. There can be partial results whilst a next page is requested above
  return useMemo(
    () => ({
      items: data?.pages.flatMap((page) => page.items) ?? [],
      fetchingFinished: hasNextPage === false,
      fetchNext: fetchNextPage,
    }),
    [data?.pages, fetchNextPage, hasNextPage]
  );
};
