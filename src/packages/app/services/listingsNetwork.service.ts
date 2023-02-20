import { fetchCached, truncatePositive } from '../../../shared';

export const ITEMS_PER_PAGE = 20;

const BASE_URL =
  'https://api-mainnet.magiceden.dev/v2/collections/okay_bears/listings';

export interface ListingsPage {
  items: ListingsItem[];
  nextPage: number | undefined;
}

export interface ListingsItem {
  name: string; // TODO: Missing real names
  price: number;
  extra: {
    img: string;
  };
}

export const fetchListings = async (page: number): Promise<ListingsPage> => {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const items: ListingsItem[] = await fetchCached(
    `${BASE_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`
  );

  return {
    items: items.map((item, index) => mapListingsItem(item, index, offset)),
    nextPage: items.length === ITEMS_PER_PAGE ? page + 1 : undefined,
  };
};

const mapListingsItem = (
  { price, extra }: ListingsItem,
  index: number,
  offset: number
) => ({
  name: `Okay Bear #${offset + index + 1}`, // TODO: Missing real names
  price: truncatePositive(price, 4),
  extra,
});
