import { renderHook } from '@testing-library/react-hooks';
import type { UseFetchNextPageParams } from './useFetchItemsOnPageChange';
import { useFetchItemsOnPageChange } from './useFetchItemsOnPageChange';

describe('useFetchItemsOnPageChange', () => {
  it('fetches next items on page change', () => {
    const fetchNext = jest.fn();
    const { rerender } = renderHook(useFetchItemsOnPageChange, {
      initialProps: {
        prevPage: undefined,
        page: 1,
        fetchNext,
      } as UseFetchNextPageParams,
    });
    expect(fetchNext).not.toHaveBeenCalled();

    rerender({ prevPage: 1, page: 2, fetchNext });

    expect(fetchNext).toHaveBeenCalledTimes(1);
    expect(fetchNext).toHaveBeenCalledWith(2);
  });

  it('does not fetch next items on mount', () => {
    const fetchNext = jest.fn();
    renderHook(useFetchItemsOnPageChange, {
      initialProps: { prevPage: undefined, page: 1, fetchNext },
    });

    expect(fetchNext).not.toHaveBeenCalled();
  });

  it('does not fetch next items on the same page rerender', () => {
    const fetchNext = jest.fn();
    const { rerender } = renderHook(useFetchItemsOnPageChange, {
      initialProps: {
        prevPage: undefined,
        page: 1,
        fetchNext,
      } as UseFetchNextPageParams,
    });

    rerender({ prevPage: 1, page: 1, fetchNext });

    expect(fetchNext).not.toHaveBeenCalled();
  });

  it('does not fetch next items on smaller page rerender', () => {
    const fetchNext = jest.fn();
    const { rerender } = renderHook(useFetchItemsOnPageChange, {
      initialProps: {
        prevPage: undefined,
        page: 2,
        fetchNext,
      } as UseFetchNextPageParams,
    });

    rerender({ prevPage: 2, page: 1, fetchNext });

    expect(fetchNext).not.toHaveBeenCalled();
  });

  it('throws on page smaller than 1', () => {
    const fetchNext = jest.fn();
    const { result } = renderHook(useFetchItemsOnPageChange, {
      initialProps: { prevPage: undefined, page: 0, fetchNext },
    });

    expect(result.error?.message).toStrictEqual('Page 0 is lower than 1');
  });
});
