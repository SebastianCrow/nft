import { useCallback, useMemo, useState } from 'react';

const BASE_URL =
  'https://api-mainnet.magiceden.dev/v2/collections/okay_bears/listings';

const ITEMS_PER_PAGE = 2; // TODO

// TODO: Move types
export interface ListingsItem {
  // TODO: Missing real names
  name: string;
  price: number;
  extra: {
    img: string;
  };
}

interface UseFetchListingsReturn {
  data: FetchingState;
  fetchNext: () => void;
}

interface FetchingState {
  type: 'NotFetched' | 'InProgress' | 'FetchedPartially' | 'FetchedFully'; // TODO: Enum
  page: number;
  items: ListingsItem[];
}

export const useFetchListings = (): UseFetchListingsReturn => {
  const [fetchingState, setFetchingState] = useState<FetchingState>({
    type: 'NotFetched',
    page: 1,
    items: [],
  });

  const fetchNext = useCallback(() => {
    if (
      fetchingState.type === 'InProgress' ||
      fetchingState.type === 'FetchedFully'
    ) {
      // TODO: assert
      return;
    }

    const nextPage =
      fetchingState.type === 'NotFetched' ? 1 : fetchingState.page + 1;

    setFetchingState((prevFetchingState) => ({
      type: 'InProgress',
      page: nextPage,
      items: prevFetchingState.items,
    }));

    const offset = (nextPage - 1) * ITEMS_PER_PAGE;
    fetch(`${BASE_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`)
      .then((response) => response.json())
      .then((items: ListingsItem[]) => {
        setFetchingState((prevFetchingState) => ({
          type:
            items.length < ITEMS_PER_PAGE ? 'FetchedFully' : 'FetchedPartially',
          page: nextPage,
          items: prevFetchingState.items.concat(
            items.map(({ price, extra }, index) => ({
              price,
              extra,
              name: `Okay Bear #${offset + index + 1}`, // TODO: Missing real names
            }))
          ),
        }));
      });
  }, [fetchingState]);

  return useMemo(
    () => ({
      data: fetchingState,
      fetchNext,
    }),
    [fetchNext, fetchingState]
  );
};
