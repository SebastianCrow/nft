import LRUCache from 'lru-cache';
import { ensureDefined } from './typescript.util';

const cache = new LRUCache<string, Promise<Response>>({
  max: 500,
});

const validateResponse = ({ status }: Response) =>
  status >= 200 && status <= 299;

export const fetchCached = async <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  if (!cache.has(url)) {
    const fetchPromise = fetch(url, { ...init, cache: 'force-cache' })
      .then((res) => {
        if (!validateResponse(res)) {
          return Promise.reject(new Error(`Error status code: ${res.status}`));
        }
        return res;
      })
      .catch((e) => {
        cache.delete(url);
        return Promise.reject(e);
      });

    cache.set(url, fetchPromise);
  }

  const res = await ensureDefined(cache.get(url));
  return res.clone().json(); // TODO: Think of clone
};
