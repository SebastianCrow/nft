import { useMemo } from 'react';
import { GRID_WIDTH_MULTIPLIER } from './useGridSize';

export const GRID_ITEM_SPACING_PX = 16;

interface UseGridLayoutParams {
  itemsCount: number;
  gridWidth: number;
  additionalVerticalPx?: number;
}

export interface UseGridLayoutReturn {
  rowCount: number;
  columnCount: number;
  rowHeight: number;
  columnWidth: number;
}

export const useGridLayout = ({
  itemsCount,
  gridWidth,
  additionalVerticalPx = 0,
}: UseGridLayoutParams): UseGridLayoutReturn => {
  const columnCount = useMemo(
    () => [6, 5, 4, 3].find((r) => gridWidth >= r * GRID_WIDTH_MULTIPLIER) ?? 2,
    [gridWidth]
  );

  const rowCount = useMemo(
    () => Math.ceil(itemsCount / columnCount),
    [columnCount, itemsCount]
  );

  const columnWidth = useMemo(() => {
    const columnsTotalWidth = gridWidth - GRID_ITEM_SPACING_PX;
    const oneColumnWidth = Math.floor(columnsTotalWidth / columnCount);
    return Math.max(oneColumnWidth, 0);
  }, [columnCount, gridWidth]);

  const rowHeight = useMemo(
    () => columnWidth + additionalVerticalPx,
    [additionalVerticalPx, columnWidth]
  );

  return useMemo(
    () => ({
      rowCount,
      columnCount,
      rowHeight,
      columnWidth,
    }),
    [columnCount, columnWidth, rowCount, rowHeight]
  );
};
