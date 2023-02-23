import type { FunctionComponent, PropsWithChildren } from 'react';
import { useMemo } from 'react';
import type { CSSPropertiesNumericRect } from './grid.layout';
import { computeGridCellStyle } from './grid.layout';

export interface GridCellProps {
  rowIndex: number;
  columnIndex: number;
  itemIndex: number;
  size: {
    width: number;
    height: number;
  };
}

interface GridCellWrapperProps {
  style: CSSPropertiesNumericRect;
}

/**
 * Wrap {@param children} using a grid cell with an applied {@param style} computed by {@link computeGridCellStyle}
 */
export const GridCellWrapper: FunctionComponent<
  PropsWithChildren<GridCellWrapperProps>
> = ({ style, children }) => {
  const computedStyle = useMemo(() => computeGridCellStyle(style), [style]);
  return <div style={computedStyle}>{children}</div>;
};
