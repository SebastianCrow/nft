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

  it('debounces returned value correctly', () => {
    const delay = 100;

    const { result, rerender } = renderHook(
      (params: UseDebounceParams<number>) => useDebounce(params),
      {
        initialProps: {
          value: 1,
          delay,
        },
      }
    );
    expect(result.current).toStrictEqual(1);

    rerender({ value: 2, delay });
    expect(result.current).toStrictEqual(1);

    // Delay almost reached -> Value not updated yet
    jest.advanceTimersByTime(delay - 1);
    expect(result.current).toStrictEqual(1);

    // Delay reached -> Value updated
    jest.advanceTimersByTime(1);
    expect(result.current).toStrictEqual(2);
  });
});
