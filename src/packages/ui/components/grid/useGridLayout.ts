import { useMemo } from 'react';
import { ensureDefined } from '../../../../shared';
import { GRID_COLUMN_BREAKPOINTS, GRID_ITEM_SPACING_PX } from './grid.layout';

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

/**
 * Get layout for the grid:
 * - row count
 * - column count
 * - row height
 * - column width
 * based on:
 * - {@param itemsCount}: number of items
 * - {@param gridWidth}: width of the grid
 * - {@param additionalVerticalPx}: additional vertical height for the card (e.g., `+50px` to card's width)
 */
export const useGridLayout = ({
  itemsCount,
  gridWidth,
  additionalVerticalPx = 0,
}: UseGridLayoutParams): UseGridLayoutReturn => {
  const columnCount = useMemo(
    () =>
      ensureDefined(
        GRID_COLUMN_BREAKPOINTS.find(({ minWidth }) => gridWidth >= minWidth)
      ).count,
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
