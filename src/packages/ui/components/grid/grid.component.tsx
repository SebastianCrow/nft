import {
  forwardRef,
  FunctionComponent,
  MutableRefObject,
  useMemo,
  CSSProperties,
  PropsWithChildren,
  ComponentType,
  createElement,
} from 'react';
import { FixedSizeGrid } from 'react-window';
import { GRID_ITEM_SPACING_PX, useGridLayout } from './useGridLayout';
import { useGridSize } from './useGridSize';

const HEADER_HEIGHT_PX = 64; // TODO: Dynamic

const computeGridCellStyle = (style: any) => ({
  // TODO: Casting
  ...style,
  left: style.left + GRID_ITEM_SPACING_PX,
  top: style.top + GRID_ITEM_SPACING_PX + HEADER_HEIGHT_PX,
  width: style.width - GRID_ITEM_SPACING_PX,
  height: style.height - GRID_ITEM_SPACING_PX,
});

// TODO
// eslint-disable-next-line react/display-name
const innerElementType = forwardRef<HTMLDivElement, { style: any }>(
  ({ style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        height: style.height + HEADER_HEIGHT_PX + GRID_ITEM_SPACING_PX,
      }}
      {...rest}
    />
  )
);

export interface GridCellProps {
  rowIndex: number;
  columnIndex: number;
  itemIndex: number;
}

interface GridCellWrapperProps {
  style: CSSProperties;
}

const GridCellWrapper: FunctionComponent<
  PropsWithChildren<GridCellWrapperProps>
> = ({ style, children }) => {
  const computedStyle = useMemo(() => computeGridCellStyle(style), [style]);
  return <div style={computedStyle}>{children}</div>;
};

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
        innerElementType={innerElementType}
      >
        {({ rowIndex, columnIndex, style }) => {
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
