import { render } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import * as UseFetchListings from '../../hooks/useFetchListings';
import type { ListingsItem } from '../../services/listingsNetwork.service';
import { Listings } from './listings.component';

mockResizeObserver();

describe('Listings', () => {
  const ITEMS: ListingsItem[] = [
    { name: 'Item1', price: 1, extra: { img: 'https://img.item1' } },
  ];

  it('does not render no results page when fetching is not finished yet', () => {
    jest.spyOn(UseFetchListings, 'useFetchListings').mockReturnValue({
      items: [],
      fetchingFinished: false,
      fetchNext: jest.fn(),
    });

    const { queryByText, getByTestId } = render(<Listings />);

    expect(queryByText('No results')).not.toBeInTheDocument();
    expect(
      queryByText("We couldn't find anything. Let's try again")
    ).not.toBeInTheDocument();

    expect(getByTestId('grid-main')).toBeInTheDocument();
  });

  it('renders no results page when fetching is finished', () => {
    jest.spyOn(UseFetchListings, 'useFetchListings').mockReturnValue({
      items: [],
      fetchingFinished: true,
      fetchNext: jest.fn(),
    });

    const { getByText, queryByTestId } = render(<Listings />);

    expect(getByText('No results')).toBeInTheDocument();
    expect(
      getByText("We couldn't find anything. Let's try again")
    ).toBeInTheDocument();

    expect(queryByTestId('grid-main')).not.toBeInTheDocument();
  });

  it('renders grid when loading items', () => {
    jest.spyOn(UseFetchListings, 'useFetchListings').mockReturnValue({
      items: [],
      fetchingFinished: false,
      fetchNext: jest.fn(),
    });

    const { getByTestId } = render(<Listings />);

    expect(getByTestId('grid-main')).toBeInTheDocument();
  });

  it('renders grid when items are loaded', () => {
    jest.spyOn(UseFetchListings, 'useFetchListings').mockReturnValue({
      items: ITEMS,
      fetchingFinished: true,
      fetchNext: jest.fn(),
    });

    const { getByTestId } = render(<Listings />);

    expect(getByTestId('grid-main')).toBeInTheDocument();
  });
});
