import { renderHook } from '@testing-library/react-hooks';
import type { UseGridLayoutReturn } from './useGridLayout';
import { useGridLayout } from './useGridLayout';

describe('useGridLayout', () => {
  it.each([
    [
      1000,
      779,
      56,
      { columnCount: 2, rowCount: 500, columnWidth: 381, rowHeight: 437 },
    ],
    [
      1000,
      780,
      56,
      { columnCount: 3, rowCount: 334, columnWidth: 254, rowHeight: 310 },
    ],
    [
      1000,
      1160,
      56,
      { columnCount: 4, rowCount: 250, columnWidth: 286, rowHeight: 342 },
    ],
    [
      1000,
      1460,
      56,
      { columnCount: 5, rowCount: 200, columnWidth: 288, rowHeight: 344 },
    ],
    [
      1000,
      1760,
      56,
      { columnCount: 6, rowCount: 167, columnWidth: 290, rowHeight: 346 },
    ],
    [
      1000,
      1792,
      56,
      { columnCount: 6, rowCount: 167, columnWidth: 296, rowHeight: 352 },
    ],
    // Zero items
    [
      0,
      779,
      56,
      { columnCount: 2, rowCount: 0, columnWidth: 381, rowHeight: 437 },
    ],
    // Zero width
    [
      1000,
      0,
      56,
      { columnCount: 2, rowCount: 500, columnWidth: 0, rowHeight: 56 },
    ],
  ])(
    'computes layout [itemsCount = %i, gridWidth = %i]',
    (
      itemsCount,
      gridWidth,
      additionalVerticalPx,
      expectedLayout: UseGridLayoutReturn
    ) => {
      const { result } = renderHook(useGridLayout, {
        initialProps: { itemsCount, gridWidth, additionalVerticalPx },
      });
      expect(result.current).toStrictEqual(expectedLayout);
    }
  );
});
