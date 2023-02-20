import { RefObject, useEffect, useState } from 'react';

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

    const onScroll = () => {
      setScrollTop(element.scrollTop);
    };

    element.addEventListener('scroll', onScroll);
    return () => {
      element.removeEventListener('scroll', onScroll);
    };
  }, [ref]);

  return scrollTop;
};