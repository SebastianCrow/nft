import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react';
import { useScrollTop } from './useScrollTop';

describe('useScrollTop', () => {
  test('returns correct `scrollTop` value on `scroll` event', () => {
    const { getByTestId } = render(<div data-testid="test" />);

    const element = getByTestId('test');

    const { result } = renderHook(useScrollTop, {
      initialProps: {
        ref: {
          current: element,
        },
      },
    });

    expect(result.current).toStrictEqual(0);

    element.scrollTop = 10;
    fireEvent.scroll(element);

    expect(result.current).toStrictEqual(10);
  });
});
