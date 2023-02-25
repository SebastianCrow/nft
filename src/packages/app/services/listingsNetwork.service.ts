import type { Optional } from '../../../shared';
import { fetchCached, truncatePositive } from '../../../shared';

export const ITEMS_PER_PAGE = 20;

const BASE_URL =
  'https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears';

interface FetchListingsDto {
  results: ListingsItem[];
}

export interface ListingsPage {
  items: ListingsItem[];
  nextPage: Optional<number>;
}

export interface ListingsItem {
  title: string;
  price: number;
  // TODO: API returns a big original PNG image (2000px x 2000px).
  //  Thumbnails around 400px x 400px in a next-gen format would be a sweet spot.
  //  Potentially, a responsive size/variant based on the client's layout size.
  img: string;
}

/**
 * Fetch NFT listings from the API endpoint
 *
 * @param page Page to fetch
 */
export const fetchListings = async (page: number): Promise<ListingsPage> => {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const { results }: FetchListingsDto = await fetchCached(
    `${BASE_URL}&offset=${offset}&limit=${ITEMS_PER_PAGE}`
  );

  return {
    items: results.map(mapListingsItem),
    nextPage: results.length === ITEMS_PER_PAGE ? page + 1 : undefined,
  };
};

/**
 * Map listings item from backend DTO to the app representation
 *
 * @param item NFT item
 */
const mapListingsItem = (item: ListingsItem): ListingsItem => ({
  ...item,
  price: truncatePositive(item.price, 4), // make sure that prices are not too long
});
