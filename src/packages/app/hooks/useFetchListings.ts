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

interface UseFetchListingsParams {
  searchQuery?: string;
}

interface UseFetchListingsReturn {
  items: ListingsItem[];
  fetchingFinished: boolean;
  fetchNext: () => void;
}

export const useFetchListings = ({
  searchQuery,
}: UseFetchListingsParams): UseFetchListingsReturn => {
  const fetchFilteredListings: QueryFunction<ListingsPage> = async ({
    pageParam = 1,
  }) => {
    const { items, nextPage } = await fetchListings(pageParam);

    const filteredItems = searchQuery
      ? items.filter(({ name }: ListingsItem) =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : items;

    return {
      items: filteredItems,
      nextPage,
    };
  };

  const {
    data,
    hasNextPage,
    fetchNextPage,
  }: UseInfiniteQueryResult<ListingsPage> = useInfiniteQuery<ListingsPage>({
    queryKey: [LISTINGS_QUERY_KEY, searchQuery],
    queryFn: fetchFilteredListings,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: true,
    retryDelay: LISTINGS_RETRY_DELAY_MS,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const pages = data?.pages ?? [];
    const lastPageItems = pages[pages.length - 1]?.items;
    if (lastPageItems && lastPageItems.length < ITEMS_PER_PAGE && hasNextPage) {
      fetchNextPage();
    }
  }, [data?.pages, fetchNextPage, hasNextPage]);

  return useMemo(
    () => ({
      items: data?.pages.flatMap((page) => page.items) ?? [],
      fetchingFinished: hasNextPage === false,
      fetchNext: fetchNextPage,
    }),
    [data?.pages, fetchNextPage, hasNextPage]
  );
};
