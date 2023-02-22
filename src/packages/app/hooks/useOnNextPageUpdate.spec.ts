import { renderHook } from '@testing-library/react-hooks';
import type { UseFetchNextPageParams } from './useOnNextPageUpdate';
import { useOnNextPageUpdate } from './useOnNextPageUpdate';

describe('useOnNextPageUpdate', () => {
  it('fetches next items on page change', () => {
    const onPageUpdate = jest.fn();
    const { rerender } = renderHook(useOnNextPageUpdate, {
      initialProps: {
        prevPage: undefined,
        page: 1,
        onPageUpdate,
      } as UseFetchNextPageParams,
    });
    expect(onPageUpdate).not.toHaveBeenCalled();

    rerender({ prevPage: 1, page: 2, onPageUpdate });

    expect(onPageUpdate).toHaveBeenCalledTimes(1);
    expect(onPageUpdate).toHaveBeenCalledWith(2);
  });

  it('does not fetch next items on mount', () => {
    const onPageUpdate = jest.fn();
    renderHook(useOnNextPageUpdate, {
      initialProps: { prevPage: undefined, page: 1, onPageUpdate },
    });

    expect(onPageUpdate).not.toHaveBeenCalled();
  });

  it('does not fetch next items on the same page rerender', () => {
    const onPageUpdate = jest.fn();
    const { rerender } = renderHook(useOnNextPageUpdate, {
      initialProps: {
        prevPage: undefined,
        page: 1,
        onPageUpdate,
      } as UseFetchNextPageParams,
    });

    rerender({ prevPage: 1, page: 1, onPageUpdate });

    expect(onPageUpdate).not.toHaveBeenCalled();
  });

  it('does not fetch next items on smaller page rerender', () => {
    const onPageUpdate = jest.fn();
    const { rerender } = renderHook(useOnNextPageUpdate, {
      initialProps: {
        prevPage: undefined,
        page: 2,
        onPageUpdate,
      } as UseFetchNextPageParams,
    });

    rerender({ prevPage: 2, page: 1, onPageUpdate });

    expect(onPageUpdate).not.toHaveBeenCalled();
  });

  it('throws on page smaller than 1', () => {
    const onPageUpdate = jest.fn();
    const { result } = renderHook(useOnNextPageUpdate, {
      initialProps: { prevPage: undefined, page: 0, onPageUpdate },
    });

    expect(result.error?.message).toStrictEqual('Page 0 is lower than 1');
  });
});
