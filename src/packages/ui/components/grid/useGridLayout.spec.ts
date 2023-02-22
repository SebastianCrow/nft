import { renderHook } from '@testing-library/react-hooks';
import type { UseGridLayoutReturn } from './useGridLayout';
import { useGridLayout } from './useGridLayout';

describe('useGridLayout', () => {
  it.each([
    [
      1000,
      767,
      { columnCount: 2, rowCount: 500, columnWidth: 375, rowHeight: 431 },
    ],
    [
      1000,
      768,
      { columnCount: 3, rowCount: 334, columnWidth: 250, rowHeight: 306 },
    ],
    [
      1000,
      1024,
      { columnCount: 4, rowCount: 250, columnWidth: 252, rowHeight: 308 },
    ],
    [
      1000,
      1280,
      { columnCount: 5, rowCount: 200, columnWidth: 252, rowHeight: 308 },
    ],
    [
      1000,
      1536,
      { columnCount: 6, rowCount: 167, columnWidth: 253, rowHeight: 309 },
    ],
    [
      1000,
      2000,
      { columnCount: 6, rowCount: 167, columnWidth: 330, rowHeight: 386 },
    ],
  ])(
    'computes layout [itemsCount = %i, gridWidth = %i]',
    (itemsCount, gridWidth, layout: UseGridLayoutReturn) => {
      const { result } = renderHook(() =>
        useGridLayout({ itemsCount, gridWidth })
      );
      expect(result.current).toStrictEqual(layout);
    }
  );
});
