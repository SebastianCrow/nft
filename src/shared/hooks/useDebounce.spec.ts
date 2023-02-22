import { renderHook } from '@testing-library/react-hooks';
import type { UseDebounceParams } from './useDebounce';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('debounces changed value', () => {
    const { result, rerender } = renderHook(
      (params: UseDebounceParams<number>) => useDebounce(params),
      {
        initialProps: {
          value: 1,
          delay: 100,
        },
      }
    );
    expect(result.current).toStrictEqual(1); // 0ms

    // Value changed
    rerender({ value: 2, delay: 100 }); // 0ms
    expect(result.current).toStrictEqual(1);

    // Delay almost reached -> Value not updated yet
    jest.advanceTimersByTime(100 - 1); // 99ms
    expect(result.current).toStrictEqual(1);

    // Delay reached -> Value updated
    jest.advanceTimersByTime(1); // 100ms
    expect(result.current).toStrictEqual(2);
  });

  it('debounces value when delay is changed', () => {
    const { result, rerender } = renderHook(
      (params: UseDebounceParams<number>) => useDebounce(params),
      {
        initialProps: {
          value: 1,
          delay: 100,
        },
      }
    );
    // Initial value
    expect(result.current).toStrictEqual(1); // 0ms

    // Value changed
    rerender({ value: 2, delay: 100 }); // 0ms
    expect(result.current).toStrictEqual(1);

    // Delay almost reached -> Value not updated
    jest.advanceTimersByTime(100 - 1); // 99ms
    expect(result.current).toStrictEqual(1);

    // Delay changed -> Value not updated
    rerender({ value: 2, delay: 200 }); // 99ms
    jest.advanceTimersByTime(1); // 100ms
    expect(result.current).toStrictEqual(1);

    // Delay almost reached -> Value not updated yet
    jest.advanceTimersByTime(198); // 298ms
    expect(result.current).toStrictEqual(1);

    // Delay reached -> Value updated
    jest.advanceTimersByTime(1); // 299ms
    expect(result.current).toStrictEqual(2);
  });
});
