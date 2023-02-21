import { useEffect, useState } from 'react';

interface UseDebounceParams<T> {
  value: T;
  delay: number;
}

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
