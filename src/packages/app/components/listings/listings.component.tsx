import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { Card, Grid, GridCellProps } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings';
import { usePrevious } from '../../../../shared';
import { Header } from '../header/header.component';
import { ReactComponent as LogoSolana } from '../../../../resources/logo-solana.svg';
import {
  ITEMS_PER_PAGE,
  ListingsItem,
} from '../../services/listingsNetwork.service';
import { useListingsPage } from './useListingsPage';

export const Listings: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { page, goToPage, resetToFirstPage } = useListingsPage();

  const { items, finished, fetchNext } = useFetchListings({
    searchQuery,
  });

  const prevPage = usePrevious(page);
  useEffect(() => {
    if (!prevPage || page > prevPage) {
      fetchNext();
    }
  }, [fetchNext, page, prevPage]);

  const prevSearchQuery = usePrevious(searchQuery);
  useEffect(() => {
    if (prevSearchQuery !== searchQuery) {
      resetToFirstPage();
    }
  }, [prevSearchQuery, resetToFirstPage, searchQuery]);

  const gridElementRef = useRef<HTMLElement>(null);

  const itemsCount = useMemo(
    () => items.length + (!finished ? ITEMS_PER_PAGE : 0),
    [finished, items.length]
  );

  const ListingsLoadingCard = ({
    rowIndex,
    columnIndex,
    itemIndex,
  }: GridCellProps) => {
    const nextPage = Math.floor(itemIndex / ITEMS_PER_PAGE) + 1;
    if (nextPage > page) {
      goToPage(nextPage);
    }
    return <Card key={`loader-${rowIndex}-${columnIndex}`} />;
  };

  const ListingsItemCard = ({
    item: {
      name,
      price,
      extra: { img },
    },
  }: {
    item: ListingsItem;
  }) => {
    return (
      <Card
        key={name}
        titleLeft={<div className="truncate">{name}</div>}
        titleRight={
          <div className="flex items-center space-x-1.5">
            {/* TODO: SVG size? */}
            <LogoSolana width={14.83} height={12} />
            <div>{price}</div>
          </div>
        }
      >
        <img src={img} alt={`Image for ${name}`} />
      </Card>
    );
  };

  const ListingsCard = ({
    rowIndex,
    columnIndex,
    itemIndex,
  }: GridCellProps) => {
    if (itemIndex >= items.length + ITEMS_PER_PAGE) {
      return null;
    }

    const item = items[itemIndex];

    if (!item) {
      return !finished ? (
        <ListingsLoadingCard
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          itemIndex={itemIndex}
        />
      ) : null;
    }

    return <ListingsItemCard item={item} />;
  };

  return (
    <div className="h-full bg">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollElementRef={gridElementRef}
      />
      <Grid itemsCount={itemsCount} gridElementRef={gridElementRef}>
        {ListingsCard}
      </Grid>
    </div>
  );
};
