import { useEffect, useState } from 'react';

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

interface ListingsResults {
  items: ListingsItem[];
  finished: boolean;
}

interface UseFetchListingsParams {
  page: number;
}

export const useFetchListings = ({ page }: UseFetchListingsParams) => {
  const [data, setData] = useState<ListingsResults>({
    items: [],
    finished: false,
  });

  useEffect(() => {
    if (page < 1) {
      return;
    }

    const offset = (page - 1) * ITEMS_PER_PAGE;
    fetch(`${BASE_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`)
      .then((response) => response.json())
      .then((items: ListingsItem[]) => {
        setData((prevData) => ({
          items: prevData.items.concat(
            items.map(({ price, extra }, index) => ({
              price,
              extra,
              name: `Okay Bear #${offset + index + 1}`, // TODO: Missing real names
            }))
          ),
          finished: items.length < ITEMS_PER_PAGE,
        }));
      });
  }, [page]);

  return data;
};
