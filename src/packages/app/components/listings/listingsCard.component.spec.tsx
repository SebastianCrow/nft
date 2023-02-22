import { render } from '@testing-library/react';
import type { ListingsItem } from '../../services/listingsNetwork.service';
import { ITEMS_PER_PAGE } from '../../services/listingsNetwork.service';
import { noop } from '../../../../shared';
import { ListingsCard } from './listingsCard.component';

describe('ListingsCard', () => {
  const ITEMS: ListingsItem[] = [
    { name: 'Item1', price: 1, extra: { img: 'https://img.item1' } },
    { name: 'Item2', price: 2, extra: { img: 'https://img.item2' } },
    { name: 'Item3', price: 3, extra: { img: 'https://img.item3' } },
  ];

  const COLUMN_COUNT = 2;

  const CARD_SIZE = {
    width: 100,
    height: 156,
  };

  const getRowIndex = (itemIndex: number): number => {
    return Math.floor(itemIndex / COLUMN_COUNT);
  };

  const getColumnIndex = (itemIndex: number): number => {
    return itemIndex % COLUMN_COUNT;
  };

  it('does not render for out of bounds item', () => {
    const itemsWithLoadersCount = ITEMS.length + ITEMS_PER_PAGE;
    const { container } = render(
      <ListingsCard
        items={ITEMS}
        fetchingFinished={false}
        page={1}
        goToPage={noop}
        rowIndex={getRowIndex(itemsWithLoadersCount)}
        columnIndex={getColumnIndex(itemsWithLoadersCount)}
        itemIndex={itemsWithLoadersCount}
        size={CARD_SIZE}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('does not render for finished fetching', () => {
    const { container } = render(
      <ListingsCard
        items={ITEMS}
        fetchingFinished={true}
        page={1}
        goToPage={noop}
        rowIndex={getRowIndex(3)}
        columnIndex={getColumnIndex(3)}
        itemIndex={3}
        size={CARD_SIZE}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders loading card for not fetched item', () => {
    const { getByTestId } = render(
      <ListingsCard
        items={ITEMS}
        fetchingFinished={false}
        page={1}
        goToPage={noop}
        rowIndex={getRowIndex(3)}
        columnIndex={getColumnIndex(3)}
        itemIndex={3}
        size={CARD_SIZE}
      />
    );

    expect(getByTestId('card-loader-main')).toBeInTheDocument();
    expect(getByTestId('card-loader-title-left')).toBeInTheDocument();
    expect(getByTestId('card-loader-title-right')).toBeInTheDocument();
  });

  it('renders item card', () => {
    const { getByText } = render(
      <ListingsCard
        items={ITEMS}
        fetchingFinished={false}
        page={1}
        goToPage={noop}
        rowIndex={getRowIndex(2)}
        columnIndex={getColumnIndex(2)}
        itemIndex={2}
        size={CARD_SIZE}
      />
    );

    expect(getByText('Item3')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });
});
