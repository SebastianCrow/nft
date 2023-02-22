import type { MutableRefObject } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { UseResizeObserverCallback } from '@react-hook/resize-observer';
import useResizeObserver from '@react-hook/resize-observer';

export const GRID_WIDTH_MULTIPLIER = 256;

interface Size {
  width: number;
  height: number;
}

interface UseGridSizeReturn {
  width: number;
  height: number;
  gridContainerRef: MutableRefObject<HTMLDivElement | null>;
}

export const useGridSize = (): UseGridSizeReturn => {
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const [gridSize, setGridSize] = useState<Size>({ width: 0, height: 0 });

  const onResize: UseResizeObserverCallback = useCallback(
    ({ contentRect: { width, height } }) => {
      setGridSize({
        width,
        height,
      });
    },
    []
  );
  useResizeObserver(gridContainerRef, onResize);

  return useMemo(
    () => ({
      width: Math.min(gridSize.width, 7 * GRID_WIDTH_MULTIPLIER),
      height: gridSize.height,
      gridContainerRef,
    }),
    [gridSize.height, gridSize.width]
  );
};
