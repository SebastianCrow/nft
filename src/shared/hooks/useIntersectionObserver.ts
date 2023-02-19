import { RefObject, useEffect, useState } from 'react';

interface UseIntersectionObserverParams {
  ref: RefObject<HTMLElement>;
  threshold?: number;
}

export const useIntersectionObserver = ({
  ref,
  threshold,
}: UseIntersectionObserverParams): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isIntersecting;
};
