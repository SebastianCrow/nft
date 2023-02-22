import { renderHook } from '@testing-library/react-hooks';
import { useResetPageOnSearchQueryChange } from './useResetPageOnSearchQueryChange';

describe('useResetPageOnSearchQueryChange', () => {
  it('resets page on search query change', () => {
    const onReset = jest.fn();
    const { rerender } = renderHook(useResetPageOnSearchQueryChange, {
      initialProps: {
        searchQuery: '',
        onReset,
      },
    });
    expect(onReset).not.toHaveBeenCalled();

    rerender({
      searchQuery: 'a',
      onReset,
    });
    expect(onReset).toHaveBeenCalledTimes(1);

    rerender({
      searchQuery: '',
      onReset,
    });
    expect(onReset).toHaveBeenCalledTimes(2);
  });

  it('does not reset page on mount', () => {
    const onReset = jest.fn();
    renderHook(useResetPageOnSearchQueryChange, {
      initialProps: {
        searchQuery: '',
        onReset,
      },
    });
    expect(onReset).not.toHaveBeenCalled();
  });
});
