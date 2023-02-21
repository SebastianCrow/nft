import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react';
import { useScrollTop } from './useScrollTop';

describe('useScrollTop', () => {
  test('returns correct `scrollTop` value on `scroll` event', () => {
    const { container } = render(<div data-testid="test" />);

    const { result } = renderHook(() =>
      useScrollTop({
        ref: {
          current: container,
        },
      })
    );

    expect(result.current).toStrictEqual(0);

    act(() => {
      container.scrollTop = 10;
      fireEvent.scroll(container);
    });

    expect(result.current).toStrictEqual(10);
  });
});
