import { useEffect, useState } from 'react';

interface UseDebounceParams<T> {
  value: T;
  delay: number;
}

/**
 * Debounce a given {@param value} with the specified {@param delay}.
 */
export const useDebounce = <T>({ value, delay }: UseDebounceParams<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
};
