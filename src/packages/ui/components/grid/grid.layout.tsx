import type { CSSProperties, ForwardRefRenderFunction } from 'react';
import { forwardRef } from 'react';

// TODO: Header is static right now. Compute height with `useResizeObserver` if needed (dynamic header height)
const HEADER_HEIGHT_PX = 64;

export const GRID_ITEM_SPACING_PX = 16;

export const GRID_COLUMN_BREAKPOINTS = [
  { minWidth: 1760, count: 6 },
  { minWidth: 1460, count: 5 },
  { minWidth: 1160, count: 4 },
  { minWidth: 780, count: 3 },
  { minWidth: 0, count: 2 },
] as const;

export const GRID_MAX_WIDTH =
  GRID_COLUMN_BREAKPOINTS[0].minWidth + 2 * GRID_ITEM_SPACING_PX;

export interface CSSPropertiesNumericRect
  extends Pick<CSSProperties, 'top' | 'left' | 'width' | 'height'> {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Compute grid cell's {@param style} by adding {@link GRID_ITEM_SPACING_PX} and {@link HEADER_HEIGHT_PX}
 */
export const computeGridCellStyle = (
  style: CSSPropertiesNumericRect
): CSSProperties => ({
  ...style,
  top: style.top + GRID_ITEM_SPACING_PX + HEADER_HEIGHT_PX,
  left: style.left + GRID_ITEM_SPACING_PX,
  width: style.width - GRID_ITEM_SPACING_PX,
  height: style.height - GRID_ITEM_SPACING_PX,
});

interface GridInnerElementTypeProps {
  style: CSSPropertiesNumericRect;
}

/**
 * Custom grid's internal component with height enlarged by {@link HEADER_HEIGHT_PX} and {@link GRID_ITEM_SPACING_PX}
 */
const GridInnerElementType: ForwardRefRenderFunction<
  HTMLDivElement,
  GridInnerElementTypeProps
> = ({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      height: style.height + HEADER_HEIGHT_PX + GRID_ITEM_SPACING_PX,
    }}
    {...rest}
  />
);

export const LayoutGridInnerElementType = forwardRef(GridInnerElementType);
