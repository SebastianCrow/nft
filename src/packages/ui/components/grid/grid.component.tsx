import {
  forwardRef,
  FunctionComponent,
  MutableRefObject,
  useMemo,
  useRef,
  CSSProperties,
  PropsWithChildren,
  ComponentType,
  createElement,
} from 'react';
import { FixedSizeGrid } from 'react-window';
import { useResizeObserver } from '../../../../shared/hooks/useResizeObserver';

const HEADER_HEIGHT_PX = 64; // TODO: Dynamic

const ITEM_SPACING_PX = 16;

const computeGridCellStyle = (style: any) => ({
  // TODO: Casting
  ...style,
  left: style.left + ITEM_SPACING_PX,
  top: style.top + ITEM_SPACING_PX + HEADER_HEIGHT_PX,
  width: style.width - ITEM_SPACING_PX,
  height: style.height - ITEM_SPACING_PX,
});

// TODO
// eslint-disable-next-line react/display-name
const innerElementType = forwardRef<HTMLDivElement, { style: any }>(
  ({ style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        height: style.height + HEADER_HEIGHT_PX + ITEM_SPACING_PX,
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
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const gridSize = useResizeObserver({ ref: gridContainerRef });
  const { width, height } = gridSize ?? { width: 0, height: 0 };

  const WIDTH_MULTIPLIER = 256;
  const computedWidth = Math.min(width, 7 * WIDTH_MULTIPLIER);

  const columnCount = useMemo(() => {
    if (computedWidth >= 6 * WIDTH_MULTIPLIER) {
      return 6;
    } else if (computedWidth >= 5 * WIDTH_MULTIPLIER) {
      return 5;
    } else if (computedWidth >= 4 * WIDTH_MULTIPLIER) {
      return 4;
    } else if (computedWidth >= 3 * WIDTH_MULTIPLIER) {
      return 3;
    } else {
      return 2;
    }
  }, [computedWidth]);

  const rowCount = Math.ceil(itemsCount / columnCount);

  const ITEMS_TOTAL_WIDTH = computedWidth - ITEM_SPACING_PX;
  const ITEM_WIDTH = Math.floor(ITEMS_TOTAL_WIDTH / columnCount);
  const ITEM_HEIGHT = ITEM_WIDTH + 56; // TODO

  return (
    <div className="h-full flex justify-center" ref={gridContainerRef}>
      <FixedSizeGrid
        columnCount={columnCount}
        columnWidth={ITEM_WIDTH}
        width={computedWidth}
        rowCount={rowCount}
        rowHeight={ITEM_HEIGHT}
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
