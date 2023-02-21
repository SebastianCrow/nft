import { useEffect, useRef } from 'react';
import type { Optional } from '../utils';

/**
 * Get previous value of the given {@param value}.
 */
export const usePrevious = <T>(value: T): Optional<T> => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
