import LRUCache from 'lru-cache';
import { truncatePositive } from '../../../shared';
import { ensureDefined } from '../../../shared/utils/typescript.util';

export const ITEMS_PER_PAGE = 20;

const cacheRes = new LRUCache<number, Promise<Response>>({
  max: 500,
});

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
  if (!cacheRes.has(page)) {
    const responsePromise = fetch(
      `${BASE_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`
    ).catch((e) => {
      cacheRes.delete(page);
      return Promise.reject(e);
    });
    cacheRes.set(page, responsePromise);
  }
  const res = await cacheRes.get(page);
  // TODO: Check API errors, e.g. offset=NaN
  const items: ListingsItem[] = await ensureDefined(res).clone().json(); // TODO: think of clone
  return {
    items: items.map(({ price, extra }: ListingsItem, index) => ({
      name: `Okay Bear #${offset + index + 1}`, // TODO: Missing real names
      price: truncatePositive(price, 4),
      extra,
    })),
    nextPage: items.length === ITEMS_PER_PAGE ? page + 1 : undefined,
  };
};
