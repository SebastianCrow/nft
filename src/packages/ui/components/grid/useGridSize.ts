import { MutableRefObject, useMemo, useRef } from 'react';
import { useResizeObserver } from '../../../../shared';

export const GRID_WIDTH_MULTIPLIER = 256;

interface UseGridSizeReturn {
  width: number;
  height: number;
  gridContainerRef: MutableRefObject<HTMLDivElement | null>;
}

export const useGridSize = (): UseGridSizeReturn => {
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const gridSize = useResizeObserver({ ref: gridContainerRef });
  const { width, height } = gridSize ?? { width: 0, height: 0 };

  return useMemo(
    () => ({
      width: Math.min(width, 7 * GRID_WIDTH_MULTIPLIER),
      height,
      gridContainerRef,
    }),
    [height, width]
  );
};
