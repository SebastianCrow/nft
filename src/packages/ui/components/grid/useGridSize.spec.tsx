import { act, renderHook } from '@testing-library/react-hooks';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import { render } from '@testing-library/react';
import { useGridSize } from './useGridSize';

const resizeObserver = mockResizeObserver();

describe('useGridSize', () => {
  it('gets size correctly', () => {
    const { result, rerender } = renderHook(useGridSize);

    const { getByTestId } = render(
      <div data-testid="test" ref={result.current.gridContainerRef}></div>
    );

    const element = getByTestId('test');

    resizeObserver.mockElementSize(element, {
      contentBoxSize: { inlineSize: 10, blockSize: 20 },
    });

    rerender();

    act(() => {
      resizeObserver.resize();
    });

    expect(result.current.width).toStrictEqual(10);
    expect(result.current.height).toStrictEqual(20);
  });

  it('clips to max width', () => {
    const { result, rerender } = renderHook(useGridSize);

    const { getByTestId } = render(
      <div data-testid="test" ref={result.current.gridContainerRef}></div>
    );

    const element = getByTestId('test');

    // Try enlarging to 2000px in width
    resizeObserver.mockElementSize(element, {
      contentBoxSize: { inlineSize: 2000, blockSize: 3000 },
    });

    rerender();

    act(() => {
      resizeObserver.resize();
    });

    // Clipped to 1792px in width
    expect(result.current.width).toStrictEqual(1792);
    expect(result.current.height).toStrictEqual(3000);
  });
});
