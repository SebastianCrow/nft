import { renderHook } from '@testing-library/react-hooks';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  it('returns previous value', () => {
    const { result, rerender } = renderHook(usePrevious, {
      initialProps: 1,
    });
    expect(result.current).toStrictEqual(undefined);
    rerender(2);
    expect(result.current).toStrictEqual(1);
    rerender(3);
    expect(result.current).toStrictEqual(2);
  });
});
