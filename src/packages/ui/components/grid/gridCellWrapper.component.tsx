import {
  CSSProperties,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
} from 'react';
import { computeGridCellStyle } from './grid.layout';

export interface GridCellProps {
  rowIndex: number;
  columnIndex: number;
  itemIndex: number;
}

interface GridCellWrapperProps {
  style: CSSProperties;
}

export const GridCellWrapper: FunctionComponent<
  PropsWithChildren<GridCellWrapperProps>
> = ({ style, children }) => {
  const computedStyle = useMemo(() => computeGridCellStyle(style), [style]);
  return <div style={computedStyle}>{children}</div>;
};
