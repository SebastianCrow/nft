import {
  QueryFunction,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { Simulate } from 'react-dom/test-utils';
import contextMenu = Simulate.contextMenu;

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

const cacheRes: any = {};

interface UseFetchListingsParams {
  searchQuery?: string;
}

export const useFetchListings = ({
  searchQuery,
}: UseFetchListingsParams): UseInfiniteQueryResult<ListingsItem> => {
  // TODO: Abstract return type
  const fetchListings: QueryFunction = async ({ pageParam = 1 }) => {
    const offset = (pageParam - 1) * ITEMS_PER_PAGE;
    if (!cacheRes[pageParam]) {
      cacheRes[pageParam] = fetch(
        `${BASE_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`
      );
    }
    const res = await cacheRes[pageParam];
    // TODO: Check API errors, e.g. offset=NaN
    const items: ListingsItem[] = await res.clone().json(); // TODO: think of clone
    return {
      items: items.map(({ price, extra }: ListingsItem, index) => ({
        price,
        extra,
        name: `Okay Bear #${offset + index + 1}`, // TODO: Missing real names
      })),
      nextPage: items.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
    };
  };

  const fetchFilteredListings: QueryFunction = async (context) => {
    if (!searchQuery) {
      return fetchListings(context);
    }

    const filteredItems = [];
    let nextPage = context.pageParam ?? 1;
    while (filteredItems.length < ITEMS_PER_PAGE && nextPage) {
      const pageResults = (await fetchListings({
        ...context,
        pageParam: nextPage,
      })) as any; // TODO: casting

      filteredItems.push(
        ...pageResults.items.filter(({ name }: ListingsItem) =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      nextPage = pageResults.nextPage;
    }

    return {
      items: filteredItems,
      nextPage,
    };
  };

  return useInfiniteQuery({
    queryKey: [searchQuery ? `listings-${searchQuery}` : 'listings'],
    queryFn: async (context) => {
      const results = await fetchFilteredListings(context);
      console.log('sleposeb', 'results', results);
      return results;
    },
    getNextPageParam: (lastPage) => {
      return (lastPage as any).nextPage; // TODO: Casting
    },
    retry: true,
    refetchOnWindowFocus: false,
  });
};
