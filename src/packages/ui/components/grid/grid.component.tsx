import type {
  FunctionComponent,
  MutableRefObject,
  ComponentType,
  ReactElement,
} from 'react';
import { createElement } from 'react';
import { FixedSizeGrid } from 'react-window';
import { useGridLayout } from './useGridLayout';
import { useGridSize } from './useGridSize';
import { gridInnerElementType } from './grid.layout';
import type { GridCellProps } from './gridCellWrapper.component';
import { GridCellWrapper } from './gridCellWrapper.component';

interface GridProps {
  itemsCount: number;
  gridElementRef: MutableRefObject<HTMLElement | null>;
  children: ComponentType<GridCellProps>;
}

export const Grid: FunctionComponent<GridProps> = ({
  itemsCount,
  gridElementRef,
  children,
}) => {
  const { width, height, gridContainerRef } = useGridSize();

  const { rowCount, columnCount, rowHeight, columnWidth } = useGridLayout({
    itemsCount,
    gridWidth: width,
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
        innerElementType={gridInnerElementType}
      >
        {({ rowIndex, columnIndex, style }): ReactElement => {
          const itemIndex = rowIndex * columnCount + columnIndex;
          const cell = createElement<GridCellProps>(children, {
            rowIndex,
            columnIndex,
            itemIndex,
          });
          return <GridCellWrapper style={style}>{cell}</GridCellWrapper>;
        }}
      </FixedSizeGrid>
    </div>
  );
};
