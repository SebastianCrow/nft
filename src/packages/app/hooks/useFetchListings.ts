import { useEffect, useMemo } from 'react';
import {
  QueryFunction,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  fetchListings,
  ITEMS_PER_PAGE,
  ListingsItem,
  ListingsPage,
} from '../services/listingsNetwork.service';

const LISTINGS_QUERY_KEY = 'listings';

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
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const pages = data?.pages ?? [{ items: [] }];
    const lastPageItems = pages[pages.length - 1].items;
    if (lastPageItems.length < ITEMS_PER_PAGE && hasNextPage) {
      fetchNextPage();
    }
  }, [data?.pages, fetchNextPage, hasNextPage]);

  return useMemo(
    () => ({
      items: data?.pages.flatMap((page) => page.items) ?? [], // TODO: flat map, casting
      fetchingFinished: hasNextPage === false,
      fetchNext: fetchNextPage,
    }),
    [data?.pages, fetchNextPage, hasNextPage]
  );
};
