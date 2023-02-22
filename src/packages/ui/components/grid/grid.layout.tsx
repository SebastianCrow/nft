import type { CSSProperties } from 'react';
import { forwardRef } from 'react';
import { GRID_ITEM_SPACING_PX } from './useGridLayout';

// TODO: Header is static right now. Compute it with `useResizeObserver` if needed (dynamic header height).
const HEADER_HEIGHT_PX = 64;

export const computeGridCellStyle = (style: any): CSSProperties => ({
  // TODO: Casting
  ...style,
  left: style.left + GRID_ITEM_SPACING_PX,
  top: style.top + GRID_ITEM_SPACING_PX + HEADER_HEIGHT_PX,
  width: style.width - GRID_ITEM_SPACING_PX,
  height: style.height - GRID_ITEM_SPACING_PX,
});

// TODO
// eslint-disable-next-line react/display-name
export const gridInnerElementType = forwardRef<HTMLDivElement, { style: any }>(
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
