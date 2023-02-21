import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { useScrollTop } from './useScrollTop';

describe('useScrollTop', () => {
  test('returns correct `scrollTop` value on `scroll` event', () => {
    const element = document.createElement('div');

    const { result } = renderHook(() =>
      useScrollTop({
        ref: {
          current: element,
        },
      })
    );

    expect(result.current).toStrictEqual(0);

    act(() => {
      element.scrollTop = 10;
      fireEvent.scroll(element);
    });

    expect(result.current).toStrictEqual(10);
  });
});
