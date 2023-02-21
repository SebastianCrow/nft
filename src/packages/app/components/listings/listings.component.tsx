import { FunctionComponent, useMemo, useRef, useState } from 'react';
import { Grid } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings';
import { Header } from '../header/header.component';
import { ITEMS_PER_PAGE } from '../../services/listingsNetwork.service';
import { useListingsPage } from '../../hooks/useListingsPage';
import { ListingsCard } from './listingsCard.component';
import { classes } from '../../../../shared';

export const Listings: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const gridElementRef = useRef<HTMLElement>(null);

  const { items, fetchingFinished, fetchNext } = useFetchListings({
    searchQuery,
  });

  const { page, goToPage } = useListingsPage({
    searchQuery,
    fetchNext,
  });

  const itemsCount = useMemo(
    () => items.length + (!fetchingFinished ? ITEMS_PER_PAGE : 0),
    [fetchingFinished, items.length]
  );

  return (
    <div className={classes('h-full', 'transition-colors', 'bg dark:bg-dark')}>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollElementRef={gridElementRef}
      />
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
    </div>
  );
};
