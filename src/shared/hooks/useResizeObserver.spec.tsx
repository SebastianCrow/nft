import { renderHook, act } from '@testing-library/react-hooks';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import { render } from '@testing-library/react';
import type { UseResizeObserverParams } from './useResizeObserver';
import { useResizeObserver } from './useResizeObserver';

const resizeObserver = mockResizeObserver();

describe('useResizeObserver', () => {
  test('returns correct size on resize', () => {
    const { container } = render(<div data-testid="test" />);

    const { result } = renderHook(
      (params: UseResizeObserverParams) => useResizeObserver(params),
      {
        initialProps: {
          ref: {
            current: container,
          },
        },
      }
    );

    expect(result.current).toStrictEqual({ width: 0, height: 0 });

    resizeObserver.mockElementSize(container, {
      contentBoxSize: { inlineSize: 10, blockSize: 20 },
    });

    act(() => {
      resizeObserver.resize();
    });

    expect(result.current).toStrictEqual({ width: 10, height: 20 });
  });
});