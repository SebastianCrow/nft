import type { CSSProperties, ForwardRefRenderFunction } from 'react';
import { forwardRef } from 'react';
import { GRID_ITEM_SPACING_PX } from './useGridLayout';

// TODO: Header is static right now. Compute height with `useResizeObserver` if needed (dynamic header height)
const HEADER_HEIGHT_PX = 64;

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
