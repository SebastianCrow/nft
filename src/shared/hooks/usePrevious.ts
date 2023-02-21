import { useEffect, useRef } from 'react';
import type { Optional } from '../utils';

export const usePrevious = <T>(value: T): Optional<T> => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
