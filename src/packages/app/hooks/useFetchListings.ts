import {
  QueryFunction,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

const BASE_URL =
  'https://api-mainnet.magiceden.dev/v2/collections/okay_bears/listings';

const ITEMS_PER_PAGE = 20;

// TODO: Move types
export interface ListingsItem {
  // TODO: Missing real names
  name: string;
  price: number;
  extra: {
    img: string;
  };
}

export const useFetchListings = (): UseInfiniteQueryResult<ListingsItem> => {
  // TODO: Abstract return type
  const fetchListings: QueryFunction = async ({ pageParam = 1 }) => {
    const offset = (pageParam - 1) * ITEMS_PER_PAGE;
    const res = await fetch(
      `${BASE_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`
    );
    // TODO: Check API errors, e.g. offset=NaN
    const items: ListingsItem[] = await res.json();
    return items.map(({ price, extra }: ListingsItem, index) => ({
      price,
      extra,
      name: `Okay Bear #${offset + index + 1}`, // TODO: Missing real names
    }));
  };

  return useInfiniteQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
    getNextPageParam: (lastPage, pages) => {
      return (lastPage as any).length === ITEMS_PER_PAGE // TODO: Casting
        ? pages.length + 1
        : undefined;
    },
    retry: true,
    refetchOnWindowFocus: false,
  });
};
