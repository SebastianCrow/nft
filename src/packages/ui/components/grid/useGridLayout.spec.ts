import { renderHook } from '@testing-library/react-hooks';
import type { UseGridLayoutReturn } from './useGridLayout';
import { useGridLayout } from './useGridLayout';

describe('useGridLayout', () => {
  it.each([
    [
      1000,
      767,
      56,
      { columnCount: 2, rowCount: 500, columnWidth: 375, rowHeight: 431 },
    ],
    [
      1000,
      768,
      56,
      { columnCount: 3, rowCount: 334, columnWidth: 250, rowHeight: 306 },
    ],
    [
      1000,
      1024,
      56,
      { columnCount: 4, rowCount: 250, columnWidth: 252, rowHeight: 308 },
    ],
    [
      1000,
      1280,
      56,
      { columnCount: 5, rowCount: 200, columnWidth: 252, rowHeight: 308 },
    ],
    [
      1000,
      1536,
      56,
      { columnCount: 6, rowCount: 167, columnWidth: 253, rowHeight: 309 },
    ],
    [
      1000,
      2000,
      56,
      { columnCount: 6, rowCount: 167, columnWidth: 330, rowHeight: 386 },
    ],
    // Zero items
    [
      0,
      767,
      56,
      { columnCount: 2, rowCount: 0, columnWidth: 375, rowHeight: 431 },
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
      const { result } = renderHook(() =>
        useGridLayout({ itemsCount, gridWidth, additionalVerticalPx })
      );
      expect(result.current).toStrictEqual(expectedLayout);
    }
  );
});
