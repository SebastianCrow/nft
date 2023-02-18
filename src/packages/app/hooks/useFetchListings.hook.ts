import { useEffect, useState } from 'react';

const BASE_URL =
  'https://api-mainnet.magiceden.dev/v2/collections/okay_bears/listings';

const ITEMS_PER_PAGE = 20;

interface ListingsItem {
  // TODO: Name
  price: number;
  extra: {
    img: string;
  };
}

interface ListingsResults {
  items: ListingsItem[];
  finished: boolean;
}

export const useFetchListings = (page: number) => {
  const [data, setData] = useState<ListingsResults>({
    items: [],
    finished: false,
  });

  useEffect(() => {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    fetch(`${BASE_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`)
      .then((response) => response.json())
      .then((items: ListingsItem[]) => {
        setData({
          items: items.map(({ price, extra }) => ({
            price,
            extra,
          })),
          finished: items.length < ITEMS_PER_PAGE,
        });
      });
  }, [page]);

  return data;
};
