import LRUCache from 'lru-cache';
import { ensureDefined } from './typescript.util';

const CACHE_MAX_ITEMS = 500;

const cache = new LRUCache<string, Promise<Response>>({
  max: CACHE_MAX_ITEMS,
});

const validateResponse = (res: Response): Response => {
  if (res.status < 200 || res.status > 299) {
    throw new Error(`Error status code: ${res.status}`);
  }
  return res;
};

/**
 * Fetch given {@param url} with optional {@param init} options and cache response.
 * Caching is based on url and request's method.
 */
export const fetchCached = async <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  const key = `${url}-${init?.method ?? 'GET'}`;

  if (!cache.has(key)) {
    const fetchPromise = fetch(url, init)
      .then(validateResponse)
      .catch((e) => {
        cache.delete(key);
        return Promise.reject(e);
      });

    cache.set(key, fetchPromise);
  }

  const res = await ensureDefined(cache.get(key));
  return res.clone().json();
};
