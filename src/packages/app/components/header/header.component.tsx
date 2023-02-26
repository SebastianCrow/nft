import type { FunctionComponent, RefObject, SyntheticEvent } from 'react';
import { useCallback } from 'react';
import { Input, ThemeSwitcher } from '../../../ui';
import { classes, useScrollTop } from '../../../../shared';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  scrollElementRef: RefObject<HTMLElement>;
}

/**
 * Page Header
 *
 * @param searchQuery Search query in the input
 * @param setSearchQuery Set search query when user types
 * @param scrollElementRef Reference to the scroll element (grid)
 */
export const Header: FunctionComponent<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  scrollElementRef,
}) => {
  const scrollTop = useScrollTop({ ref: scrollElementRef });
  const floatingHeader = scrollTop > 0;

  const scrollToTop = useCallback(() => {
    scrollElementRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [scrollElementRef]);

  // Stop event propagation when clicking header children (input, theme switcher) to prevent a scroll to top logic
  const stopEventPropagation = useCallback((event: SyntheticEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={classes(
        'absolute top-0 left-0 right-2 z-10',
        'flex items-center justify-start sm:justify-center',
        'py-2 pl-4 pr-20 sm:pr-2',
        'transition-colors',
        'border-b',
        floatingHeader ? 'border-b dark:border-b-dark' : 'border-b-transparent',
        'bg dark:bg-dark'
      )}
      data-testid="header-main"
    >
      <div onClick={stopEventPropagation} className="w-10/12 sm:w-1/2">
        <Input
          value={searchQuery}
          onValueChange={setSearchQuery}
          placeholder="Search NFT name"
        />
      </div>
      <div onClick={stopEventPropagation} className="absolute right-4">
        <ThemeSwitcher />
      </div>
    </div>
  );
};
