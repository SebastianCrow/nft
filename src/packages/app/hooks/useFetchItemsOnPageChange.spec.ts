import { renderHook } from '@testing-library/react-hooks';
import { useFetchItemsOnPageChange } from './useFetchItemsOnPageChange';

describe('useFetchItemsOnPageChange', () => {
  it('fetches next items on page change', () => {
    const fetchNext = jest.fn();
    const { rerender } = renderHook(useFetchItemsOnPageChange, {
      initialProps: { page: 1, fetchNext },
    });
    expect(fetchNext).not.toHaveBeenCalled();

    rerender({ page: 2, fetchNext });

    expect(fetchNext).toHaveBeenCalledTimes(1);
  });

  it('does not fetch next items on mount', () => {
    const fetchNext = jest.fn();
    renderHook(useFetchItemsOnPageChange, {
      initialProps: { page: 1, fetchNext },
    });

    expect(fetchNext).not.toHaveBeenCalled();
  });

  it('does not fetch next items on the same page rerender', () => {
    const fetchNext = jest.fn();
    const { rerender } = renderHook(useFetchItemsOnPageChange, {
      initialProps: { page: 1, fetchNext },
    });

    rerender({ page: 1, fetchNext });

    expect(fetchNext).not.toHaveBeenCalled();
  });

  it('does not fetch next items on smaller page rerender', () => {
    const fetchNext = jest.fn();
    const { rerender } = renderHook(useFetchItemsOnPageChange, {
      initialProps: { page: 2, fetchNext },
    });

    rerender({ page: 1, fetchNext });

    expect(fetchNext).not.toHaveBeenCalled();
  });
});
