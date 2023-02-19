import { RefObject, useEffect, useState } from 'react';

interface UseIntersectionObserverParams {
  refs: RefObject<HTMLElement>[];
  threshold?: number;
}

export const useIntersectionObserver = ({
  refs,
  threshold,
}: UseIntersectionObserverParams): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const elements = refs
      .map((ref) => ref.current)
      .filter(Boolean) as HTMLElement[]; // TODO: Casting
    if (!elements.length) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [refs, threshold]);

  return isIntersecting;
};
