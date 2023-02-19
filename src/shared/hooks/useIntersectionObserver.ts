import { RefObject, useEffect, useState } from 'react';

interface UseIntersectionObserverParams {
  ref: RefObject<HTMLElement>;
  threshold?: number;
  defaultValue?: boolean;
}

export const useIntersectionObserver = ({
  ref,
  threshold,
  defaultValue = false,
}: UseIntersectionObserverParams): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(defaultValue);

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
