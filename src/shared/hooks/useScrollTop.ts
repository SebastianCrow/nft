import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

interface UseScrollTopParams {
  ref: RefObject<HTMLElement>;
}

export const useScrollTop = ({ ref }: UseScrollTopParams): number => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const onScroll = () => void setScrollTop(element.scrollTop);

    element.addEventListener('scroll', onScroll);
    return () => {
      element.removeEventListener('scroll', onScroll);
    };
  }, [ref]);

  return scrollTop;
};
