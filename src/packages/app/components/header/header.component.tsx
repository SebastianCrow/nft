import { FunctionComponent, RefObject } from 'react';
import { classes, useScrollTop } from '../../../../shared';
import { Input } from '../../../ui';

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
        'flex justify-center items-center absolute top-0 left-0 right-0 z-10 p-2 bg',
        'transition border-b',
        floatingHeader ? 'border-b' : 'border-b-transparent'
      )}
    >
      <Input
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search NFT name"
      />
    </div>
  );
};
