import { forwardRef } from 'react';
import { GRID_ITEM_SPACING_PX } from './useGridLayout';

const HEADER_HEIGHT_PX = 64; // TODO: Dynamic

export const computeGridCellStyle = (style: any) => ({
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
