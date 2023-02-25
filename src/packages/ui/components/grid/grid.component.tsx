import type { MutableRefObject, ComponentType, ReactElement } from 'react';
import { useMemo } from 'react';
import { FixedSizeGrid } from 'react-window';
import { classes } from '../../../../shared';
import { useGridLayout } from './useGridLayout';
import { useGridSize } from './useGridSize';
import type {
  GridCellItemData,
  GridItemCellProps,
  GridLoadingCellProps,
} from './gridCell.component';
import { GridCell } from './gridCell.component';
import { LayoutGridInnerElementType } from './grid.layout';

interface GridProps<ItemType> {
  loadedItems: ItemType[];
  itemsCount: number;
  gridElementRef: MutableRefObject<HTMLElement | null>;
  cardAdditionalVerticalPx?: number;
  LoadingCellComponent: ComponentType<GridLoadingCellProps>;
  ItemCellComponent: ComponentType<GridItemCellProps<ItemType>>;
}

/**
 * Render virtualized grid
 *
 * @param loadedItems An array of loaded items
 * @param itemsCount Number of items. If it's greater than {@param loadedItems}'s length, the remaining items are rendered with {@param LoadingCellComponent}
 * @param gridElementRef Reference to the grid element
 * @param cardAdditionalVerticalPx Additional height to add to every card
 * @param LoadingCellComponent Component to render a loading cell before an item is loaded
 * @param ItemCellComponent Component to render an item cell after it is loaded
 */
export const Grid = <ItemType,>({
  loadedItems,
  itemsCount,
  gridElementRef,
  cardAdditionalVerticalPx,
  LoadingCellComponent,
  ItemCellComponent,
}: GridProps<ItemType>): ReactElement => {
  const { width, height, gridContainerRef } = useGridSize();

  const { rowCount, columnCount, rowHeight, columnWidth } = useGridLayout({
    itemsCount,
    gridWidth: width,
    additionalVerticalPx: cardAdditionalVerticalPx,
  });

  const itemData: GridCellItemData<ItemType> = useMemo(
    () => ({
      loadedItems,
      itemsCount,
      columnCount,
      LoadingCellComponent,
      ItemCellComponent,
    }),
    [
      ItemCellComponent,
      LoadingCellComponent,
      columnCount,
      itemsCount,
      loadedItems,
    ]
  );

  return (
    <div
      className="h-full flex justify-center"
      ref={gridContainerRef}
      data-testid="grid-main"
    >
      <FixedSizeGrid<GridCellItemData<ItemType>>
        itemData={itemData}
        columnCount={columnCount}
        columnWidth={columnWidth}
        width={width}
        rowCount={rowCount}
        rowHeight={rowHeight}
        height={height}
        outerRef={gridElementRef}
        innerElementType={LayoutGridInnerElementType}
        className={classes(
          'scrollbar-thin scrollbar-thumb-rounded-full',
          'scrollbar-thumb-scrollbarThumb dark:scrollbar-thumb-dark-scrollbarThumb',
          'scrollbar-track-scrollbarTrack dark:scrollbar-track-dark-scrollbarTrack'
        )}
      >
        {GridCell}
      </FixedSizeGrid>
    </div>
  );
};
