import type { ComponentType, ReactElement } from 'react';
import { memo, useMemo } from 'react';
import type { GridChildComponentProps } from 'react-window';
import { areEqual } from 'react-window';
import type { CSSPropertiesNumericRect } from './grid.layout';
import { computeGridCellStyle } from './grid.layout';

export interface GridLoadingCellProps {
  itemIndex: number;
}

export interface GridItemCellProps<ItemType> {
  item: ItemType;
}

export interface GridCellItemData<ItemType> {
  loadedItems: ItemType[];
  itemsCount: number;
  columnCount: number;
  LoadingCellComponent: ComponentType<GridLoadingCellProps>;
  ItemCellComponent: ComponentType<GridItemCellProps<ItemType>>;
}

type GridCellProps<ItemType> = GridChildComponentProps<
  GridCellItemData<ItemType>
>;

/**
 * Base component to render a grid's cell.
 * It renders:
 * - {@param ItemCellComponent} for available items from {@param loadedItems}
 * - {@param LoadingCellComponent} for indexes not available in {@param loadedItems} but within {@param itemsCount}
 * - Nothing for remaining indexes
 *
 * @param rowIndex Cell's row index
 * @param columnIndex Cell's column index
 * @param style Provided base style. The final one is computed with {@link computeGridCellStyle}
 * @param loadedItems A list of loaded items
 * @param itemsCount Number of all the items to render
 * @param columnCount Number of columns
 * @param LoadingCellComponent Component to render a loading cell before an item is loaded
 * @param ItemCellComponent Component to render an item cell after it is loaded
 */
function GridCellBase<ItemType>({
  rowIndex,
  columnIndex,
  style,
  data: {
    loadedItems,
    itemsCount,
    columnCount,
    LoadingCellComponent,
    ItemCellComponent,
  },
}: GridCellProps<ItemType>): ReactElement | null {
  const itemIndex = rowIndex * columnCount + columnIndex;

  const computedStyle = useMemo(
    () => computeGridCellStyle(style as CSSPropertiesNumericRect),
    [style]
  );

  // Item index out of bounds -> Don't render any cell
  if (itemIndex >= itemsCount) {
    return null;
  }

  const item = loadedItems[itemIndex];

  return (
    <div style={computedStyle}>
      {!item && <LoadingCellComponent itemIndex={itemIndex} />}
      {item && <ItemCellComponent item={item} />}
    </div>
  );
}

/**
 * Memoized cell component to avoid redundant re-renders from `react-window`. It causes an image content to re-appear.
 */
export const GridCell = memo(GridCellBase, areEqual) as typeof GridCellBase;
