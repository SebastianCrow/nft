import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { Optional } from '../utils';

interface Size {
  width: number;
  height: number;
}

export interface UseResizeObserverParams {
  ref: RefObject<HTMLElement>;
}

/**
 * Get a current size of the given {@param ref} element.
 * Value is observed by {@link ResizeObserver}.
 */
export const useResizeObserver = ({
  ref,
}: UseResizeObserverParams): Optional<Size> => {
  const [size, setSize] = useState<Size>();

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const { width, height } = element.getBoundingClientRect();
    setSize({
      width,
      height,
    });

    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return size;
};
