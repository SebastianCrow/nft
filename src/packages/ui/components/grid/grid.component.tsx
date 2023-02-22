import type {
  FunctionComponent,
  MutableRefObject,
  ComponentType,
  ReactElement,
} from 'react';
import { createElement } from 'react';
import { FixedSizeGrid } from 'react-window';
import { classes } from '../../../../shared';
import { useGridLayout } from './useGridLayout';
import { useGridSize } from './useGridSize';
import type { GridCellProps } from './gridCellWrapper.component';
import { GridCellWrapper } from './gridCellWrapper.component';
import type { CSSPropertiesNumericRect } from './grid.layout';
import { LayoutGridInnerElementType } from './grid.layout';

interface GridProps {
  itemsCount: number;
  gridElementRef: MutableRefObject<HTMLElement | null>;
  cardAdditionalVerticalPx?: number;
  children: ComponentType<GridCellProps>;
}

export const Grid: FunctionComponent<GridProps> = ({
  itemsCount,
  gridElementRef,
  cardAdditionalVerticalPx,
  children,
}) => {
  const { width, height, gridContainerRef } = useGridSize();

  const { rowCount, columnCount, rowHeight, columnWidth } = useGridLayout({
    itemsCount,
    gridWidth: width,
    additionalVerticalPx: cardAdditionalVerticalPx,
  });

  return (
    <div className="h-full flex justify-center" ref={gridContainerRef}>
      <FixedSizeGrid
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
        {({ rowIndex, columnIndex, style }): ReactElement => {
          const itemIndex = rowIndex * columnCount + columnIndex;
          const cell = createElement<GridCellProps>(children, {
            rowIndex,
            columnIndex,
            itemIndex,
          });
          return (
            <GridCellWrapper style={style as CSSPropertiesNumericRect}>
              {cell}
            </GridCellWrapper>
          );
        }}
      </FixedSizeGrid>
    </div>
  );
};
