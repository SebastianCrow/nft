import { render } from '@testing-library/react';
import type { FunctionComponent, ReactElement } from 'react';
import type {
  GridItemCellProps,
  GridLoadingCellProps,
} from './gridCell.component';
import { GridCell } from './gridCell.component';

describe('GridCell', () => {
  const ITEMS = ['Item 1', 'Item 2', 'Item 3'];

  const ITEMS_LOADERS_COUNT = ITEMS.length + 20;

  const COLUMN_COUNT = 2;

  const CARD_SIZE = {
    width: 100,
    height: 156,
  };

  const STYLE = {
    top: 0,
    left: 0,
    ...CARD_SIZE,
  };

  const LoadingCellComponent: FunctionComponent<GridLoadingCellProps> = ({
    itemIndex,
  }) => <div>Loading item index = {itemIndex}</div>;

  const ItemCellComponent: FunctionComponent<GridItemCellProps<string>> = ({
    item,
  }) => <div>{item}</div>;

  const getRowIndex = (itemIndex: number): number => {
    return Math.floor(itemIndex / COLUMN_COUNT);
  };

  const getColumnIndex = (itemIndex: number): number => {
    return itemIndex % COLUMN_COUNT;
  };

  const renderGridCell = (
    rowIndex: number,
    columnIndex: number
  ): ReactElement => (
    <GridCell
      rowIndex={rowIndex}
      columnIndex={columnIndex}
      style={STYLE}
      data={{
        loadedItems: ITEMS,
        itemsCount: ITEMS_LOADERS_COUNT,
        columnCount: COLUMN_COUNT,
        LoadingCellComponent,
        ItemCellComponent,
      }}
    />
  );

  it('does not render for out of bounds cell', () => {
    const { container } = render(
      renderGridCell(
        getRowIndex(ITEMS_LOADERS_COUNT),
        getColumnIndex(ITEMS_LOADERS_COUNT)
      )
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders loading cell for not fetched item', () => {
    const { getByText } = render(
      renderGridCell(
        getRowIndex(ITEMS_LOADERS_COUNT),
        getColumnIndex(ITEMS_LOADERS_COUNT - 1)
      )
    );
    expect(
      getByText(`Loading item index = ${ITEMS_LOADERS_COUNT - 1}`)
    ).toBeInTheDocument();
  });

  it('renders item cell for fetched item', () => {
    const { getByText } = render(
      renderGridCell(
        getRowIndex(ITEMS.length),
        getColumnIndex(ITEMS.length) - 1
      )
    );
    expect(getByText(`Item ${ITEMS.length}`)).toBeInTheDocument();
  });
});
