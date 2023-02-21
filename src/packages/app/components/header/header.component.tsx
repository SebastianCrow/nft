import { FunctionComponent, RefObject, useCallback } from 'react';
import { classes, useScrollTop } from '../../../../shared';
import { Input, ThemeSwitcher } from '../../../ui';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  scrollElementRef: RefObject<HTMLElement>;
}

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

  const stopEventPropagation = useCallback((event: any) => {
    event.stopPropagation();
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={classes(
        'flex justify-center items-center absolute top-0 left-0 right-0 z-10 p-2',
        'border-b',
        floatingHeader ? 'border-b dark:border-b-dark' : 'border-b-transparent',
        'transition',
        'bg dark:bg-dark'
      )}
    >
      <div onClick={stopEventPropagation} className="w-1/2">
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
