import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Card, Grid, GridCellProps } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings';
import { usePrevious } from '../../../../shared';
import { Header } from '../header/header.component';
import { ReactComponent as LogoSolana } from '../../../../resources/logo-solana.svg';
import { ITEMS_PER_PAGE } from '../../services/listingsNetwork.service';

export const Listings: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { items, finished, fetchNext } = useFetchListings({
    searchQuery,
  });

  const [page, setPage] = useState(1);
  const prevPage = usePrevious(page);
  useEffect(() => {
    if (!prevPage || page > prevPage) {
      fetchNext();
    }
  }, [fetchNext, page, prevPage]);

  const prevSearchQuery = usePrevious(searchQuery);
  useEffect(() => {
    if (prevSearchQuery !== searchQuery) {
      setPage(1);
    }
  }, [prevSearchQuery, searchQuery]);

  const gridElementRef = useRef<HTMLElement>(null);

  const ListingsCell = ({
    rowIndex,
    columnIndex,
    itemIndex,
  }: GridCellProps) => {
    const item = items[itemIndex];

    if (itemIndex >= items.length + ITEMS_PER_PAGE) {
      return null;
    }

    if (!item && !finished) {
      const nextPage = Math.floor(itemIndex / ITEMS_PER_PAGE) + 1;
      if (nextPage > page) {
        setPage(nextPage);
      }

      return <Card key={`loader-${rowIndex}-${columnIndex}`} />;
    }

    if (!item) {
      return null;
    }

    const {
      name,
      price,
      extra: { img },
    } = item;

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

  return (
    <div className="h-full bg">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollElementRef={gridElementRef}
      />
      <Grid
        itemsCount={items.length + (!finished ? ITEMS_PER_PAGE : 0)}
        gridElementRef={gridElementRef}
      >
        {ListingsCell}
      </Grid>
    </div>
  );
};
