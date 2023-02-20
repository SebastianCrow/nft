import { useEffect } from 'react';
import {
  QueryFunction,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import LRUCache from 'lru-cache';
import { truncatePositive } from '../../../shared/utils/numbers.util';

const BASE_URL =
  'https://api-mainnet.magiceden.dev/v2/collections/okay_bears/listings';

export const ITEMS_PER_PAGE = 20;

// TODO: Move types
export interface ListingsItem {
  // TODO: Missing real names
  name: string;
  price: number;
  extra: {
    img: string;
  };
}

interface UseFetchListingsParams {
  searchQuery?: string;
}

// TODO: casting
const cacheRes = new LRUCache<number, Promise<any>>({
  max: 500,
});

export const useFetchListings = ({
  searchQuery,
}: UseFetchListingsParams): UseInfiniteQueryResult<ListingsItem> => {
  // TODO: Abstract return type
  const fetchListings = async (pageParam = 1) => {
    const offset = (pageParam - 1) * ITEMS_PER_PAGE;
    if (!cacheRes.has(pageParam)) {
      const responsePromise = fetch(
        `${BASE_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`
      ).catch(() => {
        cacheRes.delete(pageParam);
      });
      cacheRes.set(pageParam, responsePromise);
    }
    const res = await cacheRes.get(pageParam);
    // TODO: Check API errors, e.g. offset=NaN
    const items: ListingsItem[] = await res.clone().json(); // TODO: think of clone
    return {
      items: items.map(({ price, extra }: ListingsItem, index) => ({
        name: `Okay Bear #${offset + index + 1}`, // TODO: Missing real names
        price: truncatePositive(price, 4),
        extra,
      })),
      nextPage: items.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
    };
  };

  const fetchFilteredListings: QueryFunction = async (context) => {
    const { items, nextPage } = (await fetchListings(context.pageParam)) as any; // TODO: casting

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

  const results = useInfiniteQuery({
    queryKey: ['listings', searchQuery],
    queryFn: fetchFilteredListings,
    getNextPageParam: (lastPage) => {
      return (lastPage as any).nextPage; // TODO: Casting
    },
    retry: true,
    refetchOnWindowFocus: false,
  }) as any;

  useEffect(() => {
    const pages = results.data?.pages ?? [{ items: [] }];
    const lastPageItems = pages[pages.length - 1].items;
    if (lastPageItems.length < ITEMS_PER_PAGE && results.hasNextPage) {
      results.fetchNextPage();
    }
  }, [results]);

  return results;
};
