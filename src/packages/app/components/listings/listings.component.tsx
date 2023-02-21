import type { FunctionComponent } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Grid, MessagePanel } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings';
import { Header } from '../header/header.component';
import { ITEMS_PER_PAGE } from '../../services/listingsNetwork.service';
import { useListingsPage } from '../../hooks/useListingsPage';
import { classes, useDebounce } from '../../../../shared';
import { ListingsCard } from './listingsCard.component';

export const Listings: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce({ value: searchQuery, delay: 100 });

  const gridElementRef = useRef<HTMLElement>(null);

  const { items, fetchingFinished, fetchNext } = useFetchListings({
    searchQuery: debouncedSearchQuery,
  });

  const { page, goToPage } = useListingsPage({
    searchQuery: debouncedSearchQuery,
    fetchNext,
  });

  const itemsCount = useMemo(
    () => items.length + (!fetchingFinished ? ITEMS_PER_PAGE : 0),
    [fetchingFinished, items.length]
  );

  const clearSearchQuery = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <div
      className={classes(
        'h-full overflow-hidden',
        'transition-colors',
        'bg dark:bg-dark'
      )}
    >
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollElementRef={gridElementRef}
      />
      {!itemsCount && (
        <div className="flex justify-center items-center h-full">
          <MessagePanel
            title="No results"
            message="We couldn't find anything. Let's try again"
            onAction={clearSearchQuery}
          />
        </div>
      )}
      {itemsCount && (
        <Grid itemsCount={itemsCount} gridElementRef={gridElementRef}>
          {(gridCellProps) => (
            <ListingsCard
              {...gridCellProps}
              items={items}
              fetchingFinished={fetchingFinished}
              page={page}
              goToPage={goToPage}
            />
          )}
        </Grid>
      )}
    </div>
  );
};
