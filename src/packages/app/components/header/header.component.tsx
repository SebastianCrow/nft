import { FunctionComponent, RefObject } from 'react';
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

  return (
    <div
      className={classes(
        'flex justify-center items-center absolute top-0 left-0 right-0 z-10 p-2',
        'border-b',
        floatingHeader ? 'border-b dark:border-b-dark' : 'border-b-transparent',
        'transition',
        'bg dark:bg-dark'
      )}
    >
      <Input
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search NFT name"
      />
      <div className="absolute right-5">
        <ThemeSwitcher />
      </div>
    </div>
  );
};
