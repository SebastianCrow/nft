import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import useResizeObserverMock from '@react-hook/resize-observer';
import { useGridSize } from './useGridSize';

type UseResizeObserverFn = (
  target: never,
  callback: (params: {
    contentRect: Pick<DOMRectReadOnly, 'width' | 'height'>;
  }) => void
) => void;

jest.mock('@react-hook/resize-observer');

describe('useGridSize', () => {
  it('gets size correctly', () => {
    const resizeElement: UseResizeObserverFn = (_, callback) => {
      callback({ contentRect: { width: 100, height: 200 } });
    };
    (useResizeObserverMock as jest.Mock).mockImplementationOnce(resizeElement);

    const { result } = renderHook(useGridSize);

    render(
      <div data-testid="test" ref={result.current.gridContainerRef}></div>
    );

    expect(result.current.width).toStrictEqual(100);
    expect(result.current.height).toStrictEqual(200);
  });

  it('clips to max width', () => {
    // Try enlarging width to 2000px
    const resizeElement: UseResizeObserverFn = (_, callback) => {
      callback({ contentRect: { width: 2000, height: 3000 } });
    };
    (useResizeObserverMock as jest.Mock).mockImplementationOnce(resizeElement);

    const { result } = renderHook(useGridSize);

    render(
      <div data-testid="test" ref={result.current.gridContainerRef}></div>
    );

    // Width clipped to 1792px
    expect(result.current.width).toStrictEqual(1792);
    expect(result.current.height).toStrictEqual(3000);
  });
});
